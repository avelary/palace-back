import { PaginationParams } from "@/core/repositories/pagination-params"
import { Inventory } from "../../enterprise/entities/inventory"

export interface InventoryRepository {
  findMany(params: PaginationParams): Promise<Inventory[]>
  findByProductId(id: string): Promise<Inventory | null>
  findById(id: string): Promise<Inventory | null>
  create(inventory: Inventory): Promise<void>
  delete(inventory: Inventory): Promise<void>
  edit(inventory: Inventory): Promise<void>
}
