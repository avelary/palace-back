import { InMemoryOrderRepository } from "@/test/repositories/in-memory-order-repository"
import { FetchOrdersUseCase } from "./fetch-orders"
import { makeOrder } from "@/test/factories/make-order"

describe('Fetch Order', () => {
  let inMemoryOrderRepository: InMemoryOrderRepository
  let sut: FetchOrdersUseCase

  beforeEach(() => {
    inMemoryOrderRepository = new InMemoryOrderRepository()
    sut = new FetchOrdersUseCase(inMemoryOrderRepository)
  })

  it('should be able to fetch all orders', async() => {
    inMemoryOrderRepository.create(makeOrder())
    inMemoryOrderRepository.create(makeOrder())
    inMemoryOrderRepository.create(makeOrder())
    
    const result = await sut.execute({
      page: 1
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.order).toHaveLength(3)
  })
})