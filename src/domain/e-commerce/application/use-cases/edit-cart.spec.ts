import { InMemoryCartItemRepository } from "@/test/repositories/in-memory-cart-items-repository"
import { InMemoryCartRepository } from "@/test/repositories/in-memory-cart-repository"
import { EditCartUseCase } from "./edit-cart"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { makeCart } from "@/test/factories/make-cart"
import { makeCartItem } from "@/test/factories/make-cart-item"

let inMemoryCartItemRepository: InMemoryCartItemRepository
let inMemoryCartRepository: InMemoryCartRepository
let sut: EditCartUseCase

describe('Edit Cart', () => {
  beforeEach(() => {
    inMemoryCartItemRepository = new InMemoryCartItemRepository()
    inMemoryCartRepository = new InMemoryCartRepository()
    sut = new EditCartUseCase(inMemoryCartRepository, inMemoryCartItemRepository)
  })

  it('should be able to edit a cart (update its items)', async () => {
    const newCart = makeCart({
      userId: new UniqueEntityID('user-01')
    }, new UniqueEntityID('cart-1'))
    
    await inMemoryCartRepository.create(newCart)

    inMemoryCartItemRepository.items.push(
      makeCartItem({
        cartId: newCart.id,
        productId: new UniqueEntityID('product-1'),
      }),
      makeCartItem({
        cartId: newCart.id,
        productId: new UniqueEntityID('product-2'),
      })
    )

    const result = await sut.execute({
      userId: 'user-01',
      productIds: ['product-1', 'product-3']
    })

    expect(result.isRight()).toBe(true)
    
    expect(inMemoryCartRepository.items[0]?.userId.toString()).toEqual('user-01')
    expect(inMemoryCartRepository.items[0]?.items.currentItems).toHaveLength(2)
    expect(inMemoryCartRepository.items[0]?.items.currentItems).toEqual([
      expect.objectContaining({ productId: new UniqueEntityID('product-1')}),
      expect.objectContaining({ productId: new UniqueEntityID('product-3')})
    ])
  })
})
