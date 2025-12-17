import { InMemoryAddressRepository } from "@/test/repositories/in-memory-address-repository"
import { DeleteAddressUseCase } from "./delete-address"
import { makeUser } from "@/test/factories/make-user"
import { makeAddress } from "@/test/factories/make-address"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { InMemoryUsersRepository } from "@/test/repositories/in-memory-users-repository"

describe('Delete Address', () => {
  let inMemoryUserRepository: InMemoryUsersRepository
  let inMemoryAddressRepository: InMemoryAddressRepository
  let sut: DeleteAddressUseCase

  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUsersRepository()
    inMemoryAddressRepository = new InMemoryAddressRepository()
    sut = new DeleteAddressUseCase(inMemoryAddressRepository)
  })

  it('should be able to delete an address', async () => {
    const newUser = makeUser()
    const newAddress = makeAddress({
      userId: new UniqueEntityID(newUser.id.toString())
    })

    await inMemoryUserRepository.create(newUser)
    await inMemoryAddressRepository.create(newAddress)

    const result = await sut.execute({
      userId: newUser.id.toString(),
      addressId: newAddress.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAddressRepository.items).toHaveLength(0)
  })

  it('should not be able to delete an address that belongs to another user', async () => {
    const newUser = makeUser()
    const newAddress = makeAddress({
      userId: new UniqueEntityID('belonging-user')
    })

    await inMemoryUserRepository.create(newUser)
    await inMemoryAddressRepository.create(newAddress)

    const result = await sut.execute({
      userId: newUser.id.toString(),
      addressId: newAddress.id.toString(),
    })

    expect(result.isLeft()).toBe(true)
    expect(inMemoryAddressRepository.items).toHaveLength(1)
  })
})
