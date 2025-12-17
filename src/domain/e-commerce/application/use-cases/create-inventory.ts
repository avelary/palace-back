import { right, Either, left } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Inventory } from '../../enterprise/entities/inventory'
import { InventoryRepository } from '../repositories/inventory-repository'
import { InvalidQuantityError } from '@/core/errors/errors/invalid-quantity-error'

interface CreateInventoryUseCaseRequest {
  productId: string
  quantityAvailable: number
  warehouseLocation: string
}

type CreateInventoryUseCaseResponse = Either<InvalidQuantityError, {inventory: Inventory}>

export class CreateInventoryUseCase {
  constructor(private inventoryRepository: InventoryRepository) {}

  async execute({
    productId,
    quantityAvailable,
    warehouseLocation
  }: CreateInventoryUseCaseRequest): Promise<CreateInventoryUseCaseResponse> {
    if (quantityAvailable < 1) {
      return left(new InvalidQuantityError())
    }
    
    const inventory = Inventory.create({
      productId: new UniqueEntityID(productId),
      quantityAvailable,
      warehouseLocation
    })

    await this.inventoryRepository.create(inventory)

    return right({inventory})
  } 
}