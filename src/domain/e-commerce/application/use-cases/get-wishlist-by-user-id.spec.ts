import { InMemoryWishlistRepository } from "@/test/repositories/in-memory-wishlist-repository"
import { GetWishlistItemsByUserIdUseCase } from "./get-wishlist-by-user-id"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { makeWishlist } from "@/test/factories/make-wishlist"

describe('Get Wishlist Items By User Id', () => {
  let inMemoryWishlistRepository: InMemoryWishlistRepository
  let sut: GetWishlistItemsByUserIdUseCase

  beforeEach(() => {
    inMemoryWishlistRepository = new InMemoryWishlistRepository()
    sut = new GetWishlistItemsByUserIdUseCase(inMemoryWishlistRepository)
  })

  it('should be able to get many wishlist items by user id', async () => {
    await inMemoryWishlistRepository.create(makeWishlist({ userId: new UniqueEntityID('user-01') }))
    await inMemoryWishlistRepository.create(makeWishlist({ userId: new UniqueEntityID('user-01') }))
    await inMemoryWishlistRepository.create(makeWishlist({ userId: new UniqueEntityID('another-user') }))

    const result = await sut.execute({ userId: 'user-01' })

    expect(result.isRight()).toBe(true)
    expect(result.value?.items).toHaveLength(2)
  })

  it('should return an empty array if user has no wishlist items', async () => {
    const result = await sut.execute({ userId: 'user-99' })

    expect(result.isRight()).toBe(true)
    expect(result.value?.items).toHaveLength(0)
  })
})
