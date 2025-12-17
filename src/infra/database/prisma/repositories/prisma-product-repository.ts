import { PaginationParams } from "@/core/repositories/pagination-params";
import { ProductRepository } from "@/domain/e-commerce/application/repositories/product-repository";
import { Product } from "@/domain/e-commerce/enterprise/entities/product";
import { prisma } from "../../prisma";
import { PrismaProductMapper } from "../mappers/prisma-product-mapper";

export class PrismaProductRepository implements ProductRepository {
  async findMany({ page }: PaginationParams) {
    const products = await prisma.product.findMany({
      skip: (page - 1) * 20,
      take: 20,
    })

    return products.map(PrismaProductMapper.toDomain)
  }
  
  async findById(id: string) {
    const product = await prisma.product.findUnique({where: {id} })

    if (!product) {
      return null
    }

    return PrismaProductMapper.toDomain(product)
  }

  async create(product: Product) {
    const data = PrismaProductMapper.toPrisma(product)

    await prisma.product.create({
      data,
    })
  }

  async delete(product: Product) {
    await prisma.product.delete({
      where: { id: product.id.toString() },
    })
  }

  async edit(product: Product) {
    const data = PrismaProductMapper.toPrisma(product)

    await prisma.product.update({
      where: { id: product.id.toString() },
      data,
    })
  }
}