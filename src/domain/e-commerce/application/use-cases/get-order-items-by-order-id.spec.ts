import { InMemoryOrderItemRepository } from "@/test/repositories/in-memory-order-items-repository"
import { GetOrderItemsByOrderIdUseCase } from "./get-order-items-by-order-id"
import { makeOrderItem } from "@/test/factories/make-order-item"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

describe('Get Many Order Items By Order Id', () => {
  let inMemoryOrderItemRepository: InMemoryOrderItemRepository
  let sut: GetOrderItemsByOrderIdUseCase

  beforeEach(() => {
    inMemoryOrderItemRepository = new InMemoryOrderItemRepository()
    sut = new GetOrderItemsByOrderIdUseCase(inMemoryOrderItemRepository)
  })

  it('should be able to get many order items by order id', async() => {
    inMemoryOrderItemRepository.create(makeOrderItem({orderId: new UniqueEntityID('user-01')}))
    inMemoryOrderItemRepository.create(makeOrderItem({orderId: new UniqueEntityID('user-01')}))
    inMemoryOrderItemRepository.create(makeOrderItem({orderId: new UniqueEntityID('another-user')}))

    const result = await sut.execute({
      orderId: 'user-01'
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.items).toHaveLength(2)
  })
})