import { FastifyRequest, FastifyReply } from 'fastify'
import { CreateCartItemUseCase } from '@/domain/e-commerce/application/use-cases/create-cart-item'
import { z } from 'zod'
import type { CartRepository } from '@/domain/e-commerce/application/repositories/cart-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

export class CreateCartItemController {
  constructor(
    private createCartItemUseCase: CreateCartItemUseCase,
    private cartRepository: CartRepository
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const CartItemBodySchema = z.object({
      productId: z.string(),
      quantity: z.number()
    })

    const { productId, quantity } = CartItemBodySchema.parse(request.body)

    const userId = request.user.sub

    const cart = await this.cartRepository.findByUserId(userId)

    if (!cart) {
      return reply.status(404).send({
        message: 'Cart not found for this user'
      })
    }

    const result = await this.createCartItemUseCase.execute({
      cartId: cart.id.toString(),
      productId,
      quantity
    })

    if (result.isLeft()) {
      const error = result.value

      if (error instanceof ResourceNotFoundError) {
        return reply.status(404).send({ message: error.message })
      }

      return reply.status(400).send({ message: 'Unexpected error' })
    }

    const cartItemEntity = result.value.item

    const cartItem = {
      id: cartItemEntity.id.toString(),
      cartId: cartItemEntity.cartId.toString(),
      productId: cartItemEntity.productId.toString(),
      quantity: cartItemEntity.quantity,
      createdAt: cartItemEntity.createdAt,
    }

    return reply.status(201).send({message: 'Cart item created successfully', cartItem})
  }
}
