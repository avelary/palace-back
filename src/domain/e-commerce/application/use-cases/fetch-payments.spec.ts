import { InMemoryPaymentRepository } from "@/test/repositories/in-memory-payment-repository"
import { FetchPaymentsUseCase } from "./fetch-payments"
import { makePayment } from "@/test/factories/make-payment"

describe('Fetch Payment', () => {
  let inMemoryPaymentRepository: InMemoryPaymentRepository
  let sut: FetchPaymentsUseCase

  beforeEach(() => {
    inMemoryPaymentRepository = new InMemoryPaymentRepository()
    sut = new FetchPaymentsUseCase(inMemoryPaymentRepository)
  })

  it('should be able to fetch all payments', async() => {
    inMemoryPaymentRepository.create(makePayment())
    inMemoryPaymentRepository.create(makePayment())
    inMemoryPaymentRepository.create(makePayment())
    
    const result = await sut.execute({
      page: 1
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.payment).toHaveLength(3)
  })
})