import { InMemoryCartItemRepository } from "@/test/repositories/in-memory-cart-items-repository"
import { EditCartItemUseCase } from "./edit-cart-item"
import { makeCartItem } from "@/test/factories/make-cart-item"
import { InMemoryCartRepository } from "@/test/repositories/in-memory-cart-repository"
import { makeCart } from "@/test/factories/make-cart"


describe('Edit Cart Item', () => {
  let inMemoryCartRepository: InMemoryCartRepository
  let inMemoryCartItemRepository: InMemoryCartItemRepository
  let sut: EditCartItemUseCase

  beforeEach(() => {
    inMemoryCartRepository = new InMemoryCartRepository()
    inMemoryCartItemRepository = new InMemoryCartItemRepository()
    sut = new EditCartItemUseCase(inMemoryCartItemRepository)
  })

  it('should be able to edit a cart item', async() => {
    const newCart = makeCart()

    inMemoryCartRepository.create(newCart)

    const newCartItem = makeCartItem({
      cartId: newCart.id,
      quantity: 2
    })

    inMemoryCartItemRepository.create(newCartItem)

    const result = sut.execute({
      cartId: newCart.id.toString(),
      itemId: newCartItem.id.toString(),
      quantity: 3
    })

    expect((await result).isRight()).toBe(true)
    expect(inMemoryCartItemRepository.items[0]?.quantity).toEqual(3)
  })
})