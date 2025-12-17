import { WatchedList } from "@/core/entities/watched-list"
import { CartItem } from "./cart-item"

export class CartItemsList extends WatchedList<CartItem> {
  compareItems(a: CartItem, b: CartItem): boolean {
    return a.productId.equals(b.productId)
  }
}
