import { InMemoryPaymentRepository } from "@/test/repositories/in-memory-payment-repository"
import { EditPaymentUseCase } from "./edit-payment"
import { makePayment } from "@/test/factories/make-payment"


describe('Edit Payment', () => {
  let inMemoryPaymentRepository: InMemoryPaymentRepository
  let sut: EditPaymentUseCase

  beforeEach(() => {
    inMemoryPaymentRepository = new InMemoryPaymentRepository()
    sut = new EditPaymentUseCase(inMemoryPaymentRepository)
  })

  it('should be able to edit a payment', async() => {
    const newPayment = makePayment()

    inMemoryPaymentRepository.create(newPayment)
    
    const result = await sut.execute({
      paymentId: newPayment.id.toString(),
      amount: 199.90,
      status: 'completed',
      paymentMethod: 'pix'
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryPaymentRepository.items[0]?.paymentMethod).toEqual('pix')
    expect(inMemoryPaymentRepository.items[0]?.amount).toEqual(199.90)
  })
})