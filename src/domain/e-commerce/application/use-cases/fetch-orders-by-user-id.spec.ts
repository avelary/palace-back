import { InMemoryOrderRepository } from "@/test/repositories/in-memory-order-repository"
import { FetchOrdersByUserIdUseCase } from "./fetch-orders-by-user-id"
import { makeOrder } from "@/test/factories/make-order"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

describe('Fetch Orders By User Id', () => {
  let inMemoryOrderRepository: InMemoryOrderRepository
  let sut: FetchOrdersByUserIdUseCase

  beforeEach(() => {
    inMemoryOrderRepository = new InMemoryOrderRepository()
    sut = new FetchOrdersByUserIdUseCase(inMemoryOrderRepository)
  })

  it('should be able to fetch orders by user id', async() => {
    inMemoryOrderRepository.create(makeOrder({
      userId: new UniqueEntityID('user')
    }))
    inMemoryOrderRepository.create(makeOrder({
      userId: new UniqueEntityID('user')
    }))
    inMemoryOrderRepository.create(makeOrder({
      userId: new UniqueEntityID('another user')
    }))
    
    const result = await sut.execute({
      userId: 'user'
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.orders).toHaveLength(2)
  })
})