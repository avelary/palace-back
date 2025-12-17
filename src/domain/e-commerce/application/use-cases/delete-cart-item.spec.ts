import { InMemoryCartItemRepository } from "@/test/repositories/in-memory-cart-items-repository"
import { DeleteCartItemUseCase } from "./delete-cart-item"
import { makeCartItem } from "@/test/factories/make-cart-item"

describe('Delete Cart Item', () => {
  let inMemoryCartItemRepository: InMemoryCartItemRepository
  let sut: DeleteCartItemUseCase

  beforeEach(() => {
    inMemoryCartItemRepository = new InMemoryCartItemRepository()
    sut = new DeleteCartItemUseCase(inMemoryCartItemRepository)
  })

  it('should be able to delete cart item', async () => {
    const newCartItem = makeCartItem({})

    await inMemoryCartItemRepository.create(newCartItem)

    const result = await sut.execute({
       itemId: newCartItem.id.toString(),
       cartId: newCartItem.cartId.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryCartItemRepository.items).toHaveLength(0)
  })
})
