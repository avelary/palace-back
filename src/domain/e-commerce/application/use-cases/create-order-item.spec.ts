import { InMemoryOrderItemRepository } from "@/test/repositories/in-memory-order-items-repository"
import { CreateOrderItemUseCase } from "./create-order-item"


describe('Create Order Item', () => {
  let inMemoryOrderItemRepository: InMemoryOrderItemRepository
  let sut: CreateOrderItemUseCase

  beforeEach(() => {
    inMemoryOrderItemRepository = new InMemoryOrderItemRepository()
    sut = new CreateOrderItemUseCase(inMemoryOrderItemRepository)
  })

  it('should be able create a order item', async() => {
    const result = await sut.execute({
      orderId: 'example order',
      productId: 'example product',
      quantity: 2,
    })
    
    expect(result.isRight()).toBe(true)
    expect(inMemoryOrderItemRepository.items[0]?.orderId.toString()).toEqual('example order')
  })
})