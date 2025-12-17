import { FastifyRequest, FastifyReply } from 'fastify'
import { CreateWishlistItemUseCase } from '@/domain/e-commerce/application/use-cases/create-wishlist-item'
import { z } from 'zod'
import { FavoriteItemAlreadyExistsError } from '@/core/errors/errors/favorite-item-already-exists-error'

export class CreateWishlistItemController {
  constructor(private createWishlistItemUseCase: CreateWishlistItemUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const WishlistBodySchema = z.object({
      productId: z.string()
    })

    const { productId } = WishlistBodySchema.parse(request.body)
    const userId = request.user.sub

    const result = await this.createWishlistItemUseCase.execute({
      userId,
      productId
    })

    if(result instanceof FavoriteItemAlreadyExistsError) {
      return reply.status(400).send('Item is already favorite.')
    }

    return reply.status(201).send({
      message: 'Wishlist created successfully'
    })
  }
}
