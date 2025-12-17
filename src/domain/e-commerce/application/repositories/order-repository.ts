import { PaginationParams } from "@/core/repositories/pagination-params"
import { Order } from "../../enterprise/entities/order"

export interface OrderRepository {
  findMany(params: PaginationParams): Promise<Order[]>
  findManyByUserId(userId: string): Promise<Order[]>
  findById(id: string): Promise<Order | null>
  create(order: Order): Promise<void>
  edit(order: Order): Promise<void>
}
