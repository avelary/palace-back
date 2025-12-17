import { InventoryRepository } from "../repositories/inventory-repository" 
import { left, right, Either } from "@/core/either"
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error"
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error"

interface DeleteInventoryUseCaseRequest {
  inventoryId: string
}

type DeleteInventoryUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>

export class DeleteInventoryUseCase {
  constructor(
    private inventoryRepository: InventoryRepository,
  ) {}

  async execute({
    inventoryId
  }: DeleteInventoryUseCaseRequest): Promise<DeleteInventoryUseCaseResponse> {

    const inventory = await this.inventoryRepository.findById(inventoryId)
    
    if (!inventory) {
      return left(new ResourceNotFoundError())
    }

    await this.inventoryRepository.delete(inventory)

    return right({})
  }
}

