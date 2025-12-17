import { InMemoryUsersRepository } from "@/test/repositories/in-memory-users-repository"
import { CreateAccountUseCase } from "./create-account"
import { FakeHasher } from "@/test/encryption/fake-hasher"

describe('Create Account', () => {
  let hashGenerator: FakeHasher
  let inMemoryUsersRepository: InMemoryUsersRepository
  let sut: CreateAccountUseCase

  beforeEach(() => {
    hashGenerator = new FakeHasher
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new CreateAccountUseCase(inMemoryUsersRepository, hashGenerator)
  })

  it('should be able create a new account', async() => {
    const result = await sut.execute({
      name: 'user',
      email: 'user@email.com',
      password: 'newpassword',
      gender: 'masculine'
    })
    
    expect(result.isRight()).toBe(true)
    expect(inMemoryUsersRepository.items[0]).toMatchObject({
      role: 'user',
      password: 'newpassword-hashed'
    })
  })
})