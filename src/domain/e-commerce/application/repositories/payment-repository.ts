import { PaginationParams } from "@/core/repositories/pagination-params"
import { Payment } from "../../enterprise/entities/payment" 

export interface PaymentRepository {
  findMany(params: PaginationParams): Promise<Payment[]>
  findByOrderId(id: string): Promise<Payment | null>
  findById(id: string): Promise<Payment | null>
  create(payment: Payment): Promise<void>
  edit(payment: Payment): Promise<void>
}
