import { OrderItemRepository } from "@/domain/e-commerce/application/repositories/order-item-repository"
import { OrderItem } from "@/domain/e-commerce/enterprise/entities/order-item"


export class InMemoryOrderItemRepository implements OrderItemRepository {
  public items: OrderItem[] = []

  async findManyByOrderId(cartId: string): Promise<OrderItem[]> {
    const items = this.items.filter(item => item.orderId.toString() === cartId)
    return items
  }

  async create(orderItem: OrderItem) {
    this.items.push(orderItem)
  }
}
