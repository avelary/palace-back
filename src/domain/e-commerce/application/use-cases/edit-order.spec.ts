import { InMemoryOrderRepository } from "@/test/repositories/in-memory-order-repository"
import { EditOrderUseCase } from "./edit-order"
import { makeOrder } from "@/test/factories/make-order"


describe('Edit Order', () => {
  let inMemoryOrderRepository: InMemoryOrderRepository
  let sut: EditOrderUseCase

  beforeEach(() => {
    inMemoryOrderRepository = new InMemoryOrderRepository()
    sut = new EditOrderUseCase(inMemoryOrderRepository)
  })

  it('should be able to edit a order', async() => {
    const newOrder = makeOrder()

    inMemoryOrderRepository.create(newOrder)
    
    const result = await sut.execute({
      orderId: newOrder.id.toString(),
      status: 'complete',
      address: 'new address'
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryOrderRepository.items[0]?.status).toEqual('complete')
    expect(inMemoryOrderRepository.items[0]?.address).toEqual('new address')
  })
})