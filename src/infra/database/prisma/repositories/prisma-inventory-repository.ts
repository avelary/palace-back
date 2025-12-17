import { PaginationParams } from "@/core/repositories/pagination-params"
import { InventoryRepository } from "@/domain/e-commerce/application/repositories/inventory-repository"
import { Inventory } from "@/domain/e-commerce/enterprise/entities/inventory"
import { prisma } from "../../prisma"
import { PrismaInventoryMapper } from "../mappers/prisma-inventory-mapper"

export class PrismaInventoryRepository implements InventoryRepository {
  async findMany({page}: PaginationParams) {
    const inventory = await prisma.inventory.findMany({
      skip: (page - 1) * 20,
      take: 20,
    })
    
    return inventory.map(PrismaInventoryMapper.toDomain)
  }

  async findByProductId(id: string) {
    const inventory = await prisma.inventory.findUnique({where: {id} })

    if (!inventory) {
      return null
    }

    return PrismaInventoryMapper.toDomain(inventory)
  }

  async findById(id: string) {
    const inventory = await prisma.inventory.findUnique({where: {id} })

    if (!inventory) {
      return null
    }

    return PrismaInventoryMapper.toDomain(inventory)
  }

  async create(inventory: Inventory) {
    const data = PrismaInventoryMapper.toPrisma(inventory)
    
    await prisma.inventory.create({
      data,
    })
  }

  async delete(inventory: Inventory) {
    await prisma.inventory.delete({
      where: { id: inventory.id.toString() },
    })
  }

  async edit(inventory: Inventory) {
    const data = PrismaInventoryMapper.toPrisma(inventory)
    
    await prisma.inventory.update({
      where: { id: inventory.id.toString() },
        data,
    })
  }
}