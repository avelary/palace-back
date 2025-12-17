import { CreatePaymentUseCase } from "./create-payment"
import { InMemoryPaymentRepository } from "@/test/repositories/in-memory-payment-repository"


describe('Create Payment', () => {
  let inMemoryPaymentRepository: InMemoryPaymentRepository
  let sut: CreatePaymentUseCase

  beforeEach(() => {
    inMemoryPaymentRepository = new InMemoryPaymentRepository()
    sut = new CreatePaymentUseCase(inMemoryPaymentRepository)
  })

  it('should be able create a new inventory', async() => {
    const result = await sut.execute({
      orderId: 'order-01',
      amount: 199.90,
      paymentMethod: 'credit_card',
      transactionId: 'txn-12345'
    })
    
    expect(result.isRight()).toBe(true)
    expect(inMemoryPaymentRepository.items[0]?.orderId.toString()).toEqual('order-01')
  })
})