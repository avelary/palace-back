import { FastifyRequest, FastifyReply } from 'fastify'
import { EditCartItemUseCase } from '@/domain/e-commerce/application/use-cases/edit-cart-item'
import { CartRepository } from '@/domain/e-commerce/application/repositories/cart-repository'
import { z } from 'zod'

export class EditCartItemController {
  constructor(
    private editCartItemUseCase: EditCartItemUseCase,
    private cartRepository: CartRepository
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const CartItemBodySchema = z.object({
      itemId: z.string(),
      quantity: z.number().positive()
    })

    const { itemId, quantity } = CartItemBodySchema.parse(request.body)

    const userId = request.user.sub

    const cart = await this.cartRepository.findByUserId(userId)

    if (!cart) {
      return reply.status(404).send({ message: 'Cart not found' })
    }

    const result = await this.editCartItemUseCase.execute({
      cartId: cart.id.toString(),
      itemId,
      quantity,
    })

    if (result.isLeft()) {
      return reply.status(400).send({ message: result.value.message })
    }

    return reply.status(200).send({
      message: 'Cart item updated successfully',
    })
  }
}
