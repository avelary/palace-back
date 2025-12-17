import { CartItem } from "../../enterprise/entities/cart-item"

export interface CartItemRepository {
  findByCartIdAndProductId(cartId: string, productId: string): Promise<CartItem | null>
  findManyByCartId(id: string): Promise<CartItem[]>
  findById(id: string): Promise<CartItem | null>
  create(cartItem: CartItem): Promise<void>
  delete(cartItem: CartItem): Promise<void>
  deleteManyByCartId(id: string): Promise<void>
  edit(cartItem: CartItem): Promise<void>
}