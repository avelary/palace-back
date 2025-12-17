import { InMemoryCartItemRepository } from "@/test/repositories/in-memory-cart-items-repository"
import { CreateCartItemUseCase } from "./create-cart-item"
import { InMemoryCartRepository } from "@/test/repositories/in-memory-cart-repository"
import { makeCart } from "@/test/factories/make-cart"
import { makeCartItem } from "@/test/factories/make-cart-item"


describe('Create Cart Item', () => {
  let inMemoryCartRepository: InMemoryCartRepository
  let inMemoryCartItemRepository: InMemoryCartItemRepository
  let sut: CreateCartItemUseCase

  beforeEach(() => {
    inMemoryCartRepository = new InMemoryCartRepository()
    inMemoryCartItemRepository = new InMemoryCartItemRepository()
    sut = new CreateCartItemUseCase(inMemoryCartItemRepository, inMemoryCartRepository)
  })

  it('should be able create a cart item', async() => {
    const newCart = makeCart()
    
    inMemoryCartRepository.create(newCart)

    const result = await sut.execute({
      cartId: newCart.id.toString(),
      productId: 'example product',
      quantity: 2,
    })
    
    expect(result.isRight()).toBe(true)
    expect(inMemoryCartItemRepository.items[0]?.cartId.toString()).toEqual(newCart.id.toString())
    expect(inMemoryCartItemRepository.items[0]?.quantity).toEqual(2)
  })

  it('should increase quantity when cart item already exists', async () => {
    const newCart = makeCart()

    inMemoryCartRepository.create(newCart)

     const newCartItem = makeCartItem({
      cartId: newCart.id,
      quantity: 2
    })

    inMemoryCartItemRepository.create(newCartItem)

    const result = await sut.execute({
      cartId: newCart.id.toString(),
      productId: newCartItem.productId.toString(),
      quantity: 1,
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryCartItemRepository.items[0]?.quantity).toEqual(3)
  })
})