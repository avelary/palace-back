import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error"
import { PaymentRepository } from "../repositories/payment-repository"
import { Either, left, right } from "@/core/either"

interface EditPaymentUseCaseRequest {
  paymentId: string
  amount: number
  status: string
  paymentMethod: string
}

type EditPaymentUseCaseResponse = Either<ResourceNotFoundError, {}>

export class EditPaymentUseCase {
  constructor(private paymentRepository: PaymentRepository) {}

  async execute({
    paymentId,
    amount,
    status,
    paymentMethod
  }: EditPaymentUseCaseRequest): Promise<EditPaymentUseCaseResponse> {
    const payment = await this.paymentRepository.findById(paymentId)

    if (!payment) {
      return left(new ResourceNotFoundError())
    }

    payment.amount = amount
    payment.status = status
    payment.paymentMethod = paymentMethod

    await this.paymentRepository.edit(payment)

    return right({})
  }
}
