import { FavoriteItemAlreadyExistsError } from "@/core/errors/errors/favorite-item-already-exists-error"
import { Wishlist } from "../../enterprise/entities/wishlist"
import { WishlistRepository } from "../repositories/wishlist-repository"
import { right, Either, left } from "@/core/either"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

interface CreateWishlistItemUseCaseRequest {
  userId: string
  productId: string
}

type CreateWishlistItemUseCaseResponse = Either<FavoriteItemAlreadyExistsError, { wishlist: Wishlist }>

export class CreateWishlistItemUseCase {
  constructor(private wishlistRepository: WishlistRepository) {}

  async execute({
    userId,
    productId,
  }: CreateWishlistItemUseCaseRequest): Promise<CreateWishlistItemUseCaseResponse> {
    const itemAlreadyFavorite = await this.wishlistRepository.findByProductId(productId)
    if(itemAlreadyFavorite) {
      return left(new FavoriteItemAlreadyExistsError())
    }

    const wishlist = Wishlist.create({
      userId: new UniqueEntityID(userId),
      productId: new UniqueEntityID(productId),
    })

    await this.wishlistRepository.create(wishlist)

    return right({ wishlist })
  }
}
