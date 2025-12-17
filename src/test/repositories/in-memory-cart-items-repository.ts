import { CartItemRepository } from "@/domain/e-commerce/application/repositories/cart-item-repository"
import { CartItem } from "@/domain/e-commerce/enterprise/entities/cart-item"

export class InMemoryCartItemRepository implements CartItemRepository {
  public items: CartItem[] = []

  async findByCartIdAndProductId(cartId: string, productId: string) {
    const item = this.items.find(item => item.cartId.toString() === cartId && item.productId.toString() === productId)

    if (!item) {
      return null
    }

    return item
  }

  async findManyByCartId(cartId: string): Promise<CartItem[]> {
    const items = this.items.filter(item => item.cartId.toString() === cartId)
    return items
  }

  async findById(id: string) {
    const item = this.items.find(item => item.id.toString() === id)

    if (!item) {
      return null
    }

    return item
  }

  async create(cartItem: CartItem) {
    this.items.push(cartItem)
  }

  async delete(cartItem: CartItem) {
    const itemIndex = this.items.findIndex((item) => item.id === cartItem.id)

    this.items.splice(itemIndex, 1)
  }

  async deleteManyByCartId(cartId: string): Promise<void> {
    this.items = this.items.filter(item => item.cartId.toString() !== cartId)
  }

  async edit(cartItem: CartItem) {
    const itemIndex = this.items.findIndex((item) => item.id === cartItem.id)

    this.items[itemIndex] = cartItem
  }
}
