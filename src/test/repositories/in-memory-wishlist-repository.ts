import type { WishlistRepository } from "@/domain/e-commerce/application/repositories/wishlist-repository"
import type { Wishlist } from "@/domain/e-commerce/enterprise/entities/wishlist"


export class InMemoryWishlistRepository implements WishlistRepository {
  public items: Wishlist[] = []
  
  async findByProductAndUserId(userId: string, productId: string ) {
    const wishlist = this.items.find(
      item => item.userId.toString() === userId &&  item.productId.toString() === productId 
    )

    return wishlist || null
  }

  async findByProductId(id: string) {
    const wishlist = this.items.find(item => item.productId.toString() === id)

    if(!wishlist) {
      return null
    }

    return wishlist
  }

  async findManyByUserId(userId: string) {
    const wishlist = this.items.filter(item => item.userId.toString() === userId)
    return wishlist
  } 

  async findById(id: string) {
    const wishlist = this.items.find(item => item.id.toString() === id)

    if (!wishlist) {
      return null
    }

    return wishlist
  }

  async create(wishlist: Wishlist) {
    this.items.push(wishlist)
  }
  
  async delete(wishlist: Wishlist) {
    const itemIndex = this.items.findIndex((item) => item.id === wishlist.id)

    this.items.splice(itemIndex, 1)
  }
}