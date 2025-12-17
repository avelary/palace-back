import { FastifyRequest, FastifyReply } from 'fastify'
import { GetWishlistItemsByUserIdUseCase } from '@/domain/e-commerce/application/use-cases/get-wishlist-by-user-id'

export class GetWishlistItemByUserIdController {
  constructor(private getWishlistItemsByUserIdUseCase: GetWishlistItemsByUserIdUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.sub
    
    const result = await this.getWishlistItemsByUserIdUseCase.execute({ userId })

    if (result.isLeft()) {
      return reply.status(400).send({ message: 'Failed to get wishlist items' })
    }

    const { items } = result.value

    return reply.status(200).send({
      items: items.map((p) => ({
        id: p.id.toString(),
        productId: p.productId.toString()
      })),
    })
  }
}
