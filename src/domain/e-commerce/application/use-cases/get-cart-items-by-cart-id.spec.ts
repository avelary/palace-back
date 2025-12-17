import { InMemoryCartItemRepository } from "@/test/repositories/in-memory-cart-items-repository"
import { GetCartItemsByCartIdUseCase } from "./get-cart-items-by-cart-id"
import { makeCartItem } from "@/test/factories/make-cart-item"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

describe('Get Many CartItems By User Id', () => {
  let inMemoryCartItemRepository: InMemoryCartItemRepository
  let sut: GetCartItemsByCartIdUseCase

  beforeEach(() => {
    inMemoryCartItemRepository = new InMemoryCartItemRepository()
    sut = new GetCartItemsByCartIdUseCase(inMemoryCartItemRepository)
  })

  it('should be able to get many cart items by cart id', async() => {
    inMemoryCartItemRepository.create(makeCartItem({cartId: new UniqueEntityID('user-01')}))
    inMemoryCartItemRepository.create(makeCartItem({cartId: new UniqueEntityID('user-01')}))
    inMemoryCartItemRepository.create(makeCartItem({cartId: new UniqueEntityID('another-user')}))

    const result = await sut.execute({
      cartId: 'user-01'
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.items).toHaveLength(2)
  })
})