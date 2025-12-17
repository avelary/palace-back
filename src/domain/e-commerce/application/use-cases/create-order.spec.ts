import { InMemoryOrderRepository } from "@/test/repositories/in-memory-order-repository"
import { CreateOrderUseCase } from "./create-order"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { InMemoryOrderItemRepository } from "@/test/repositories/in-memory-order-items-repository"
import { makeOrderItem } from "@/test/factories/make-order-item"

describe("Create Order", () => {
  let inMemoryOrderItemRepository: InMemoryOrderItemRepository
  let inMemoryOrderRepository: InMemoryOrderRepository
  let sut: CreateOrderUseCase

  beforeEach(() => {
    inMemoryOrderItemRepository = new InMemoryOrderItemRepository()
    inMemoryOrderRepository = new InMemoryOrderRepository()
    sut = new CreateOrderUseCase(inMemoryOrderRepository)
  })

  it("should be able to create a new order", async () => {
    const result = await sut.execute({
      userId: 'example user',
      totalAmount: 199.90,
      address: 'example street, number, city, state and country',
      productIds: ['product-01', 'product-02'],
    })

    inMemoryOrderItemRepository.create(makeOrderItem({
      orderId: new UniqueEntityID(result.value?.order.id.toString()),
      productId: new UniqueEntityID('product-01')
    }))

    inMemoryOrderItemRepository.create(makeOrderItem({
      orderId: new UniqueEntityID(result.value?.order.id.toString()),
      productId: new UniqueEntityID('product-02')
    }))

    expect(result.isRight()).toBe(true)
    expect(inMemoryOrderRepository.items).toHaveLength(1)
    expect(inMemoryOrderRepository.items[0]?.items.currentItems).toEqual([
      expect.objectContaining({ productId: new UniqueEntityID('product-01')}),
      expect.objectContaining({ productId: new UniqueEntityID('product-02')})
    ])
    expect(inMemoryOrderItemRepository.items).toHaveLength(2)
    expect(inMemoryOrderItemRepository.items[0]?.orderId.toString()).toEqual(result.value?.order.id.toString())
  })
})
