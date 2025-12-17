import { makeUser } from "@/test/factories/make-user"
import { InMemoryUsersRepository } from "@/test/repositories/in-memory-users-repository"
import { InMemoryWishlistRepository } from "@/test/repositories/in-memory-wishlist-repository"
import { DeleteWishlistItemUseCase } from "./delete-wishlist-item"
import { makeWishlist } from "@/test/factories/make-wishlist"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"


describe('Edit Wishlist Item', () => {
  let inMemoryUsersRepository: InMemoryUsersRepository
  let inMemoryWishlistRepository: InMemoryWishlistRepository
  let sut: DeleteWishlistItemUseCase

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryWishlistRepository = new InMemoryWishlistRepository()
    sut = new DeleteWishlistItemUseCase(inMemoryWishlistRepository)
  })

  it('should be able to delete a wishlist item', async() => {
    const newUser = makeUser()
    const newWishlist = makeWishlist({
      userId: newUser.id
    })

    inMemoryUsersRepository.create(newUser)
    inMemoryWishlistRepository.create(newWishlist)
    
    const result = await sut.execute({
      userId: newUser.id.toString(),
      productId: newWishlist.productId.toString()
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryWishlistRepository.items).toHaveLength(0)
  })

  it('should not be able to delete an wishlist item that belongs to another user', async() => {
    const anotherUser = makeUser()
    const newWishlist = makeWishlist({
      userId: new UniqueEntityID('belonging-user')
    })

    inMemoryUsersRepository.create(anotherUser)
    inMemoryWishlistRepository.create(newWishlist)
    
    const result = await sut.execute({
      userId: anotherUser.id.toString(),
      productId: newWishlist.productId.toString()
    })

    expect(result.isLeft()).toBe(true)
    expect(inMemoryWishlistRepository.items).toHaveLength(1)
  })
})