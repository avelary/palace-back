
import { PaginationParams } from "@/core/repositories/pagination-params"
import { PaymentRepository } from "@/domain/e-commerce/application/repositories/payment-repository"
import { Payment } from "@/domain/e-commerce/enterprise/entities/payment"


export class InMemoryPaymentRepository implements PaymentRepository{
  public items: Payment[] = []

  async findMany({ page }: PaginationParams) {
    const payments = this.items.slice((page - 1) *  20, page * 20)
  
    return payments
  }

  async findByOrderId(id: string) {
    const payment = this.items.find(item => item.orderId.toString() === id)

    if (!payment) {
      return null
    }

    return payment
  }

  async findById(id: string): Promise<Payment | null> {
    const payment = this.items.find(item => item.id.toString() === id)

    if (!payment) {
      return null
    }

    return payment
  }

  async create(payment: Payment): Promise<void> {
    this.items.push(payment)
  }

  async edit(payment: Payment): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === payment.id)

    this.items[itemIndex] = payment
  }
}