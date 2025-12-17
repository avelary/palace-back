import { CreateAddressUseCase } from "./create-address" 
import { InMemoryAddressRepository } from "@/test/repositories/in-memory-address-repository"


describe('Create address', () => {
  let inMemoryAddressRepository: InMemoryAddressRepository
  let sut: CreateAddressUseCase

  beforeEach(() => {
    inMemoryAddressRepository = new InMemoryAddressRepository()
    sut = new CreateAddressUseCase(inMemoryAddressRepository)
  })

  it('should be able create a new address', async() => {
    const result = await sut.execute({
      userId: 'user-01',
      name: 'Home',
      street: 'example street',
      number: 'example number',
      additionalInfo: 'example info',
      city: 'example city',
      state: 'example state',
      zipCode: '00000-000',
      country:  'example country'
    })
    
    expect(result.isRight()).toBe(true)
    expect(inMemoryAddressRepository.items[0]?.userId.toString()).toEqual('user-01')
  })
})