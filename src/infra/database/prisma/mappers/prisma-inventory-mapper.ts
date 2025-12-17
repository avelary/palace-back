import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Inventory } from '@/domain/e-commerce/enterprise/entities/inventory'
import { Inventory as prismaInventory, Prisma } from '@prisma/client'

export class PrismaInventoryMapper {
  static toDomain(raw: prismaInventory): Inventory {
    return Inventory.create({
      productId: new UniqueEntityID(raw.productId,),
      quantityAvailable: raw.quantityAvailable,
      warehouseLocation: raw.warehouseLocation,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    }, new UniqueEntityID(raw.id))
  }

  static toPrisma(inventory: Inventory): Omit<Prisma.InventoryUncheckedCreateInput, 'updatedAt'> {
    return {
      id: inventory.id.toString(),
      productId: inventory.productId.toString(),
      quantityAvailable: inventory.quantityAvailable,
      warehouseLocation: inventory.warehouseLocation,
      createdAt: inventory.createdAt,
    }
  }
}