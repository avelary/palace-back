import { InMemoryInventoryRepository } from "@/test/repositories/in-memory-inventory-repository"
import { EditInventoryUseCase } from "./edit-inventory"
import { makeInventory } from "@/test/factories/make-inventory"


describe('Edit Inventory', () => {
  let inMemoryInventoryRepository: InMemoryInventoryRepository
  let sut: EditInventoryUseCase

  beforeEach(() => {
    inMemoryInventoryRepository = new InMemoryInventoryRepository()
    sut = new EditInventoryUseCase(inMemoryInventoryRepository)
  })

  it('should be able to edit a inventory', async() => {
    const newInventory = makeInventory({
      quantityAvailable: 1000,
      warehouseLocation: 'location-01'
    })

    inMemoryInventoryRepository.create(newInventory)
    
    const result = await sut.execute({
      inventoryId: newInventory.id.toString(),
      quantityAvailable: 2000,
      warehouseLocation: 'location-02'
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryInventoryRepository.items[0]?.quantityAvailable).toEqual(2000)
    expect(inMemoryInventoryRepository.items[0]?.warehouseLocation).toEqual('location-02')
  })
})