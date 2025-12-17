import { right, Either } from "@/core/either"
import { Payment } from "../../enterprise/entities/payment"
import { PaymentRepository } from "../repositories/payment-repository"

interface FetchPaymentsUseCaseRequest {
  page: number
}

type FetchPaymentsUseCaseResponse = Either<null, {payment: Payment[]}>

export class FetchPaymentsUseCase {
  constructor(private paymentRepository: PaymentRepository) {}

  async execute({
    page
  }: FetchPaymentsUseCaseRequest): Promise<FetchPaymentsUseCaseResponse> {
    const payment = await this.paymentRepository.findMany({page})

    return right({ payment })
  } 
}