import { Cart } from "../../enterprise/entities/cart"

export interface CartRepository {
  findByUserId(id: string): Promise<Cart | null>
  findById(id: string): Promise<Cart | null>
  create(cart: Cart): Promise<void>
  delete(cart: Cart): Promise<void>
  edit(cart: Cart): Promise<void>
}