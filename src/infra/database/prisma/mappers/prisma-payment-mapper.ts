import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Payment } from '@/domain/e-commerce/enterprise/entities/payment'
import { Payment as prismaPayment, Prisma, PaymentStatus, type PaymentMethod } from '@prisma/client'

export class PrismaPaymentMapper {
  static toDomain(raw: prismaPayment): Payment {
    return Payment.create({
      orderId: new UniqueEntityID(raw.orderId),
      amount: raw.amount,
      status: raw.status,
      paymentMethod: raw.paymentMethod,
      transactionId: raw.transactionId,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    }, new UniqueEntityID(raw.id))
  }

  static toPrisma(payment: Payment): Omit<Prisma.PaymentUncheckedCreateInput, 'updatedAt'> {
    return {
      id: payment.id.toString(),
      orderId: payment.orderId.toString(),
      amount: payment.amount,
      status: payment.status as PaymentStatus,
      paymentMethod: payment.paymentMethod as PaymentMethod,
      transactionId: payment.transactionId,
      createdAt: payment.createdAt,
    }
  }
}