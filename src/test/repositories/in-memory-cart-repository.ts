import { CartRepository } from "@/domain/e-commerce/application/repositories/cart-repository"
import { Cart } from "@/domain/e-commerce/enterprise/entities/cart"


export class InMemoryCartRepository implements CartRepository{
  public items: Cart[] = []

  async findByUserId(userId: string) {
    const cart = this.items.find(item => item.userId.toString() === userId)
    return cart ?? null
  }


  async findById(id: string) {
    const cart = this.items.find(item => item.id.toString() === id)

    if (!cart) {
      return null
    }

    return cart
  }

  async create(cart: Cart) {
    this.items.push(cart)
  }

  async delete(cart: Cart) {
    const itemIndex = this.items.findIndex((item) => item.id === cart.id)

    this.items.splice(itemIndex, 1)
  }
  
  async edit(cart: Cart) {
    const itemIndex = this.items.findIndex((item) => item.id === cart.id)

    this.items[itemIndex] = cart
  }
}