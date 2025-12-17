import { InMemoryInventoryRepository } from "@/test/repositories/in-memory-inventory-repository"
import { CreateInventoryUseCase } from "./create-inventory" 

describe('Create Inventory', () => {
  let inMemoryInventoryRepository: InMemoryInventoryRepository
  let sut: CreateInventoryUseCase

  beforeEach(() => {
    inMemoryInventoryRepository = new InMemoryInventoryRepository()
    sut = new CreateInventoryUseCase(inMemoryInventoryRepository)
  })

  it('should be able create a new inventory', async() => {
    const result = await sut.execute({
      productId: 'product-1',
      quantityAvailable: 1000,
      warehouseLocation: 'location-1'
    })
    
    expect(result.isRight()).toBe(true)
    expect(inMemoryInventoryRepository.items[0]?.productId.toString()).toEqual('product-1')
  })
})