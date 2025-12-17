import { InMemoryUsersRepository } from "@/test/repositories/in-memory-users-repository"
import { RefreshTokenUseCase } from "./refresh-token"
import { makeUser } from "@/test/factories/make-user"
import { FakeEncrypter } from "@/test/encryption/fake-encrypter"

describe("Refresh Token", () => {
  let inMemoryUsersRepository: InMemoryUsersRepository
  let fakeEncrypter: FakeEncrypter
  let sut: RefreshTokenUseCase

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    fakeEncrypter = new FakeEncrypter()
    sut = new RefreshTokenUseCase(inMemoryUsersRepository, fakeEncrypter)
  })

  it("should return user data and a new token when user exists", async () => {
    const newUser = makeUser()
    await inMemoryUsersRepository.create(newUser)

    const result = await sut.execute(newUser.id.toString())

    expect(result).toEqual({
      accessToken: expect.any(String),
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        gender: newUser.gender,
        image: newUser.image,
      },
    })
  })

  it("should throw an error when user does not exist", async () => {
    await expect(sut.execute("non-existent-id")).rejects.toThrow(
      "Usuário não encontrado"
    )
  })
})
