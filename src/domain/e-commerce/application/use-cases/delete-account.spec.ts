import { InMemoryUsersRepository } from "@/test/repositories/in-memory-users-repository" 
import { DeleteAccountUseCase } from "./delete-account"
import { makeUser } from "@/test/factories/make-user"


describe('Delete User', () => {
  let inMemoryUserRepository: InMemoryUsersRepository
  let sut: DeleteAccountUseCase

  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUsersRepository()
    sut = new DeleteAccountUseCase(inMemoryUserRepository)
  })

  it('should be able to delete a user', async() => {
    const newUser = makeUser()
    const authUser = newUser

    inMemoryUserRepository.create(newUser)
    
    await sut.execute({
      authUserId: authUser.id.toString(),
      userId: newUser.id.toString()
    })

    expect(inMemoryUserRepository.items).toHaveLength(0)
  })
})