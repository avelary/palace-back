import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Product } from '@/domain/e-commerce/enterprise/entities/product'
import { Product as prismaProduct, GenderSelect, Prisma, StatusSelect } from '@prisma/client'

export class PrismaProductMapper {
  static toDomain(raw: prismaProduct): Product {
    return Product.create({
      title: raw.title,
      description: raw.description,
      brand: raw.brand,
      gender: raw.gender,
      price: raw.price,
      marketPrice: raw.marketPrice,
      costPrice: raw.costPrice,
      status: raw.status,
      volume: raw.volume,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    }, new UniqueEntityID(raw.id))
  }

  static toPrisma(product: Product): Omit<Prisma.ProductUncheckedCreateInput, 'updatedAt'> {
    return {
      id: product.id.toString(),
      title: product.title,
      description: product.description,
      brand: product.brand,
      gender: product.gender as GenderSelect,
      status: product.status as StatusSelect,
      price: product.price,
      marketPrice: product.marketPrice,
      costPrice: product.costPrice,
      volume: product.volume,
      createdAt: product.createdAt,
    }
  }
}