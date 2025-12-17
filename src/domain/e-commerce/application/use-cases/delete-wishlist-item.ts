import { WishlistRepository } from "../repositories/wishlist-repository"
import { Either, right, left } from "@/core/either"
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error"
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error"

interface DeleteWishlistItemUseCaseRequest {
  userId: string
  productId: string
}

type DeleteWishlistItemUseCaseResponse = Either< ResourceNotFoundError | NotAllowedError, {}>

export class DeleteWishlistItemUseCase {
  constructor(private wishlistRepository: WishlistRepository) {}

  async execute({
    userId,
    productId
  }: DeleteWishlistItemUseCaseRequest): Promise<DeleteWishlistItemUseCaseResponse> {
    const wishlist = await this.wishlistRepository.findByProductAndUserId(userId, productId)

    if (!wishlist) {
      return left(new ResourceNotFoundError())
    }

    if (wishlist.userId.toString() !== userId) {
      return left(new NotAllowedError())
    }

    await this.wishlistRepository.delete(wishlist)

    return right({})
  }
}
