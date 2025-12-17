import type { PaginationParams } from "@/core/repositories/pagination-params"
import { InventoryRepository } from "@/domain/e-commerce/application/repositories/inventory-repository"
import { Inventory } from "@/domain/e-commerce/enterprise/entities/inventory"

export class InMemoryInventoryRepository implements InventoryRepository{
  public items: Inventory[] = []

   async findMany({page}: PaginationParams) {
    const inventorys = this.items.slice((page - 1) *  20, page * 20)

    return inventorys
  }

  async findByProductId(id: string) {
    const inventory = this.items.find(item => item.productId.toString() === id)

    if (!inventory) {
      return null
    }

    return inventory
  }

  async findById (id: string) {
    const inventory = this.items.find(item => item.id.toString() === id)

    if (!inventory) {
      return null
    }

    return inventory
  }

  async create(inventory: Inventory) {
    this.items.push(inventory)
  }

  async delete(inventory: Inventory) {
    const itemIndex = this.items.findIndex((item) => item.id === inventory.id)

    this.items.splice(itemIndex, 1)
  }

  async edit(inventory: Inventory) {
    const itemIndex = this.items.findIndex((item) => item.id === inventory.id)

    this.items[itemIndex] = inventory
  }
}