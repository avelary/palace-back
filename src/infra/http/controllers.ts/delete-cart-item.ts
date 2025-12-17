import { DeleteCartItemUseCase } from '@/domain/e-commerce/application/use-cases/delete-cart-item'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import type { CartRepository } from '@/domain/e-commerce/application/repositories/cart-repository'

export class DeleteCartItemController {
  constructor(
    private deleteCartItemUseCase: DeleteCartItemUseCase,
    private cartRepository: CartRepository
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const CartItemBodySchema = z.object({
      itemId: z.string()
    })

    const { itemId } = CartItemBodySchema.parse(request.body)

    const userId = request.user.sub

    const cart = await this.cartRepository.findByUserId(userId)

    if (!cart) {
      return reply.status(404).send({
        message: 'Cart not found for this user'
      })
    }

    await this.deleteCartItemUseCase.execute({
      cartId: cart.id.toString(),
      itemId
    })

    return reply.status(200).send({
      message: 'Cart item deleted successfully'
    })
  }
}
