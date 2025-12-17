import { PaymentRepository } from "@/domain/e-commerce/application/repositories/payment-repository"
import { Payment } from "@/domain/e-commerce/enterprise/entities/payment"
import { prisma } from "../../prisma"
import { PrismaPaymentMapper } from "../mappers/prisma-payment-mapper"
import { PaginationParams } from "@/core/repositories/pagination-params"

export class PrismaPaymentRepository implements PaymentRepository {
  async findMany({page}: PaginationParams) {
    const payments = await prisma.payment.findMany({
      skip: (page - 1) * 20,
      take: 20,
    })
          
    return payments.map(PrismaPaymentMapper.toDomain)
  }

  async findByOrderId(id: string) {
    const payment = await prisma.payment.findFirst({ where: {orderId: id} })
    
    if (!payment) {
      return null
    }

    return PrismaPaymentMapper.toDomain(payment)
  }

  async findById(id: string) {
    const payment = await prisma.payment.findFirst({ where: {id} })
    
    if (!payment) {
      return null
    }

    return PrismaPaymentMapper.toDomain(payment)
  }

  async create(payment: Payment) {
    const data = PrismaPaymentMapper.toPrisma(payment)
    
    await prisma.payment.create({
      data,
    })
  }

  async edit(payment: Payment) {
    const data = PrismaPaymentMapper.toPrisma(payment)
    
    await prisma.payment.update({
      where: { id: payment.id.toString() },
        data,
    })
  }
}