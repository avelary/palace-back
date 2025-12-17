import { Either, right } from "@/core/either"
import { WishlistRepository } from "../repositories/wishlist-repository"
import { Wishlist } from "../../enterprise/entities/wishlist"

interface GetWishlistItemsByUserIdUseCaseRequest {
  userId: string
}

type GetWishlistItemsByUserIdUseCaseResponse = Either<null, { items: Wishlist[] }>

export class GetWishlistItemsByUserIdUseCase {
  constructor(private wishlistRepository: WishlistRepository) {}

  async execute({
    userId,
  }: GetWishlistItemsByUserIdUseCaseRequest): Promise<GetWishlistItemsByUserIdUseCaseResponse> {
    const items = await this.wishlistRepository.findManyByUserId(userId)
    
    return right({ items })
  }
}
