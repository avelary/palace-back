import { InMemoryUsersRepository } from "@/test/repositories/in-memory-users-repository" 
import { makeUser } from "@/test/factories/make-user" 
import { EditAccountUseCase } from "./edit-user" 

describe('Edit User', () => {
  let inMemoryUsersRepository: InMemoryUsersRepository
  let sut: EditAccountUseCase

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new EditAccountUseCase(inMemoryUsersRepository)
  })

  it('should be able to edit a user', async() => {
    const newUser = makeUser()
    const authUser = newUser

    inMemoryUsersRepository.create(newUser)
    
    const result = await sut.execute({
      authUserId: authUser.id.toString(),
      userId: newUser.id.toString(),
      name: 'New user name',
      gender: 'masculine',
      image: ''
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryUsersRepository.items[0]).toMatchObject({
      name: 'New user name',
      gender: 'masculine'
    })
  })
})