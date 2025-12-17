import { FastifyRequest, FastifyReply } from 'fastify'
import { GetCartItemsByCartIdUseCase } from '@/domain/e-commerce/application/use-cases/get-cart-items-by-cart-id'
import { CartRepository } from '@/domain/e-commerce/application/repositories/cart-repository'

export class GetCartItemsByUserIdController {
  constructor(
    private getCartItemsByCartIdUseCase: GetCartItemsByCartIdUseCase,
    private cartRepository: CartRepository
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.sub

    const cart = await this.cartRepository.findByUserId(userId)

    if (!cart) {
      return reply.status(404).send({
        message: 'Cart not found for this user'
      })
    }

    const result = await this.getCartItemsByCartIdUseCase.execute({ cartId: cart.id.toString() })

    if (result.isLeft()) {
      return reply.status(400).send({ message: 'Failed to get cart items' })
    }

    const { items } = result.value

    return reply.status(200).send({
      items: items.map((p) => ({
        id: p.id.toString(),
        productId: p.productId.toString(),
        quantity: p.quantity,
        createdAt: p.createdAt
      })),
    })
  }
}
