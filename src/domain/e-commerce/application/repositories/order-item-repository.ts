import { OrderItem } from "../../enterprise/entities/order-item"

export interface OrderItemRepository {
  findManyByOrderId(id: string): Promise<OrderItem[]>
  create(orderItem: OrderItem): Promise<void>
}