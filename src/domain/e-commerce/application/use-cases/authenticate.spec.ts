import { InMemoryUsersRepository } from "@/test/repositories/in-memory-users-repository"
import { FakeHasher } from "@/test/encryption/fake-hasher"
import { AuthenticateUseCase } from "./authenticate"
import { FakeEncrypter } from "@/test/encryption/fake-encrypter"
import { makeUser } from "@/test/factories/make-user"

describe('Authenticate User', () => {
  let encrypter: FakeEncrypter
  let fakeHasher: FakeHasher
  let inMemoryUsersRepository: InMemoryUsersRepository
  let sut: AuthenticateUseCase

  beforeEach(() => {
    encrypter = new FakeEncrypter
    fakeHasher = new FakeHasher
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(inMemoryUsersRepository, fakeHasher, encrypter)
  })

  it('should be able authenticate a user', async () => {
    await inMemoryUsersRepository.create(makeUser({
      email: 'user@email.com',
      password: await fakeHasher.hash('newpassword')
    }))

    const result = await sut.execute({
      email: 'user@email.com',
      password: 'newpassword',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String)
    })

  })
})