import { InMemoryInventoryRepository } from "@/test/repositories/in-memory-inventory-repository"
import { DeleteInventoryUseCase } from "./delete-inventory"
import { makeInventory } from "@/test/factories/make-inventory"

describe('Delete Inventory', () => {
  let inMemoryInventoryRepository: InMemoryInventoryRepository
  let sut: DeleteInventoryUseCase

  beforeEach(() => {
    inMemoryInventoryRepository = new InMemoryInventoryRepository()
    sut = new DeleteInventoryUseCase(inMemoryInventoryRepository)
  })

  it('should be able to delete an inventory if user is manager', async () => {
    const newInventory = makeInventory()

    await inMemoryInventoryRepository.create(newInventory)

    const result = await sut.execute({
      inventoryId: newInventory.id.toString()
    })

    expect(result.isRight()).toEqual(true)
    expect(inMemoryInventoryRepository.items).toHaveLength(0)
  })
})
