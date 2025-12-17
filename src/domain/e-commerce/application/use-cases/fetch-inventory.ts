import { right, Either } from "@/core/either"
import { Inventory } from "../../enterprise/entities/inventory"
import { InventoryRepository } from "../repositories/inventory-repository"

interface FetchInventoryUseCaseRequest {
  page: number
}

type FetchInventoryUseCaseResponse = Either<null, {inventory: Inventory[]}>

export class FetchInventoryUseCase {
  constructor(private inventoryRepository: InventoryRepository) {}

  async execute({
    page
  }: FetchInventoryUseCaseRequest): Promise<FetchInventoryUseCaseResponse> {
    const inventory = await this.inventoryRepository.findMany({page})

    return right({ inventory })
  } 
}