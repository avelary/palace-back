import { DeleteWishlistItemUseCase } from '@/domain/e-commerce/application/use-cases/delete-wishlist-item'
import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'

export class DeleteWishlistItemController {
  constructor(private deleteWishlistItemUseCase: DeleteWishlistItemUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const WishlistBodySchema = z.object({ 
      productId: z.string()
    })

    const userId = request.user.sub
    const { productId } = WishlistBodySchema.parse(request.body)
    
    await this.deleteWishlistItemUseCase.execute({userId, productId})

    return reply.status(200).send({
      message: 'Wishlist item deleted successfully'
    })
  }
}
