import { InMemoryInventoryRepository } from "@/test/repositories/in-memory-inventory-repository"
import { FetchInventoryUseCase } from "./fetch-inventory"
import { makeInventory } from "@/test/factories/make-inventory"

describe('Fetch Product', () => {
  let inMemoryInventoryRepository: InMemoryInventoryRepository
  let sut: FetchInventoryUseCase

  beforeEach(() => {
    inMemoryInventoryRepository = new InMemoryInventoryRepository()
    sut = new FetchInventoryUseCase(inMemoryInventoryRepository)
  })

  it('should be able to fetch all inventory', async() => {
    inMemoryInventoryRepository.create(makeInventory())
    inMemoryInventoryRepository.create(makeInventory())
    inMemoryInventoryRepository.create(makeInventory())
    
    const result = await sut.execute({
      page: 1
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.inventory).toHaveLength(3)
  })

  it('should be able to fetch inventory with pagination', async () => {
    for (let i = 1; i <= 25; i++) {
        inMemoryInventoryRepository.create(makeInventory({
        warehouseLocation: `location-${i}`
      }))
    }

    const result = await sut.execute({ page: 2 })
  
    expect(result.isRight()).toBe(true)
    expect(result.value?.inventory.length).toBe(5)
  })
})