import { Wishlist } from "../../enterprise/entities/wishlist"

export interface WishlistRepository {
  findByProductAndUserId(userId: string, productId: string): Promise<Wishlist | null>
  findByProductId(id: string): Promise<Wishlist | null>
  findManyByUserId(id: string): Promise<Wishlist[]>
  findById(id: string): Promise<Wishlist | null>
  create(wishlist: Wishlist): Promise<void>
  delete(wishlist: Wishlist): Promise<void>
}
