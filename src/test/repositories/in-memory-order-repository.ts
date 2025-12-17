import type { PaginationParams } from "@/core/repositories/pagination-params"
import { OrderRepository } from "@/domain/e-commerce/application/repositories/order-repository"
import { Order } from "@/domain/e-commerce/enterprise/entities/order"


export class InMemoryOrderRepository implements OrderRepository{
  public items: Order[] = []

  async findMany({ page }: PaginationParams) {
    const orders = this.items.slice((page - 1) *  20, page * 20)

    return orders
  }

  async findManyByUserId(userId: string) {
    const orders = this.items.filter(item => item.userId.toString() === userId)

    return orders
  }

  async findById(id: string) {
    const order = this.items.find(item => item.id.toString() === id)

    if (!order) {
      return null
    }

    return order
  }

  async create(order: Order) {
    this.items.push(order)
  }
  
  async edit(order: Order) {
    const itemIndex = this.items.findIndex((item) => item.id === order.id)

    this.items[itemIndex] = order
  }  
}