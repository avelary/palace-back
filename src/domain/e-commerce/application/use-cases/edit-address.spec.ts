import { InMemoryAddressRepository } from "@/test/repositories/in-memory-address-repository"
import { EditAddressUseCase } from "./edit-address"
import { makeAddress } from "@/test/factories/make-address"
import { makeUser } from "@/test/factories/make-user"
import { InMemoryUsersRepository } from "@/test/repositories/in-memory-users-repository"


describe('Edit Address', () => {
  let inMemoryUsersRepository: InMemoryUsersRepository
  let inMemoryAddressRepository: InMemoryAddressRepository
  let sut: EditAddressUseCase

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryAddressRepository = new InMemoryAddressRepository()
    sut = new EditAddressUseCase(inMemoryAddressRepository)
  })

  it('should be able to edit a address', async() => {
    const newUser = makeUser()
    const newAddress = makeAddress({
      userId: newUser.id
    })

    inMemoryUsersRepository.create(newUser)
    inMemoryAddressRepository.create(newAddress)
    
    const result = await sut.execute({
      userId: newUser.id.toString(),
      addressId: newAddress.id.toString(),
      name: 'name example',
      street: 'street example',
      number: 'number example',
      additionalInfo: 'additional info example',
      city: 'city example',
      state: 'state example',
      zipCode: 'zip code example',
      country: 'country example'
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAddressRepository.items[0]?.city).toEqual('city example')
  })
})