import { Either, right } from '@/core/either'
import { Payment } from '../../enterprise/entities/payment'
import { PaymentRepository } from '../repositories/payment-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface CreatePaymentUseCaseRequest {
  orderId: string
  amount: number
  paymentMethod: string
  transactionId: string
}

type CreatePaymentUseCaseResponse = Either<null, { payment: Payment }>

export class CreatePaymentUseCase {
  constructor(private paymentRepository: PaymentRepository) {}

  async execute({
    orderId,
    amount,
    paymentMethod,
    transactionId
  }: CreatePaymentUseCaseRequest): Promise<CreatePaymentUseCaseResponse> {
    const payment = Payment.create({
      orderId: new UniqueEntityID(orderId),
      amount,
      status: 'pending',
      paymentMethod,
      transactionId
    })

    await this.paymentRepository.create(payment)

    return right({ payment })
  }
}
