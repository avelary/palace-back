import { PaginationParams } from "@/core/repositories/pagination-params";
import { ProductRepository } from "@/domain/e-commerce/application/repositories/product-repository";
import { Product } from "@/domain/e-commerce/enterprise/entities/product";

export class InMemoryProductsRepository implements ProductRepository{
  public items: Product[] = []

  async findMany({page}: PaginationParams) {
    const products = this.items.slice((page - 1) *  20, page * 20)

    return products
  }

  async findById(id: string) {
    const product = this.items.find(item => item.id.toString() === id)

    if (!product) {
      return null
    }

    return product
  }

  async create(product: Product) {
    this.items.push(product)
  }

  async delete(product: Product) {
    const itemIndex = this.items.findIndex((item) => item.id === product.id)

    this.items.splice(itemIndex, 1)
  }

  async edit(product: Product) {
    const itemIndex = this.items.findIndex((item) => item.id === product.id)

    this.items[itemIndex] = product
  }
}