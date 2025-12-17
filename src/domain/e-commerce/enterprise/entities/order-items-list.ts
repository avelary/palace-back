import { WatchedList } from "@/core/entities/watched-list"
import { OrderItem } from "./order-item"


export class OrderItemsList extends WatchedList<OrderItem> {
  compareItems(a: OrderItem, b: OrderItem): boolean {
    return a.productId.equals(b.productId)
  }
}
