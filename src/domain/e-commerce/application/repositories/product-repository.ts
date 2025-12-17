import { PaginationParams } from "@/core/repositories/pagination-params"
import { Product } from "../../enterprise/entities/product"

export interface ProductRepository {
  findMany(params: PaginationParams): Promise<Product[]>
  findById(id: string): Promise<Product | null>
  create(product: Product): Promise<void>
  delete(product: Product): Promise<void>
  edit(product: Product): Promise<void>
}