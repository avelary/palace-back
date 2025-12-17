import { InMemoryWishlistRepository } from "@/test/repositories/in-memory-wishlist-repository"
import { CreateWishlistItemUseCase } from "./create-wishlist-item"


describe('Create Wishlist', () => {
  let inMemoryWishlistsRepository: InMemoryWishlistRepository
  let sut: CreateWishlistItemUseCase

  beforeEach(() => {
    inMemoryWishlistsRepository = new InMemoryWishlistRepository()
    sut = new CreateWishlistItemUseCase(inMemoryWishlistsRepository)
  })

  it('should be able create a new product', async() => {
    const result = await sut.execute({
      userId: 'user-01',
      productId: 'product-01'
    })
    
    expect(result.isRight()).toBe(true)
  })
})