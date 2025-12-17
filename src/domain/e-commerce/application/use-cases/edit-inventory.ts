import { InventoryRepository } from "../repositories/inventory-repository" 
import { left, right, Either } from "@/core/either"
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error"

interface EditInventoryUseCaseRequest {
  inventoryId: string
  quantityAvailable: number
  warehouseLocation: string
}

type EditInventoryUseCaseResponse = Either<ResourceNotFoundError, {}>

export class EditInventoryUseCase {
  constructor(private InventoryRepository: InventoryRepository) {}

  async execute({
    inventoryId,
    quantityAvailable,
    warehouseLocation
  }: EditInventoryUseCaseRequest): Promise<EditInventoryUseCaseResponse> {
    const inventory = await this.InventoryRepository.findById(inventoryId)

    if (!inventory) {
      return left(new ResourceNotFoundError())
    }

    inventory.quantityAvailable = quantityAvailable
    inventory.warehouseLocation = warehouseLocation
    

    await this.InventoryRepository.edit(inventory)

    return right({})
  } 
}