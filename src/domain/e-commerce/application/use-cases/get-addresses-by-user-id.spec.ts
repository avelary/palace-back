import { InMemoryAddressRepository } from "@/test/repositories/in-memory-address-repository"
import { GetAddressesByUserIdUseCase } from "./get-addresses-by-user-id"
import { makeAddress } from "@/test/factories/make-address"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

describe('Get Many Addresses By User Id', () => {
  let inMemoryAddressRepository: InMemoryAddressRepository
  let sut: GetAddressesByUserIdUseCase

  beforeEach(() => {
    inMemoryAddressRepository = new InMemoryAddressRepository()
    sut = new GetAddressesByUserIdUseCase(inMemoryAddressRepository)
  })

  it('should be able to get many addresses by user id', async() => {
    inMemoryAddressRepository.create(makeAddress({userId: new UniqueEntityID('user-01')}))
    inMemoryAddressRepository.create(makeAddress({userId: new UniqueEntityID('user-01')}))
    inMemoryAddressRepository.create(makeAddress({userId: new UniqueEntityID('another-user')}))

    const result = await sut.execute({
      userId: 'user-01'
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.addresses).toHaveLength(2)
  })

  it('should return an empty array if user has no addresses', async () => {
    const result = await sut.execute({
      userId: 'user-99',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.addresses).toHaveLength(0)
  })
})