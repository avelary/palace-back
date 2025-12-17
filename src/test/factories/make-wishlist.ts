import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Wishlist, type WishlistProps } from "@/domain/e-commerce/enterprise/entities/wishlist";

export function makeWishlist(override: Partial<WishlistProps> = {}, id?: UniqueEntityID) {
  const user = Wishlist.create({
    userId: new UniqueEntityID(),
    productId: new UniqueEntityID(),
    ...override
  }, id);

  return user
}