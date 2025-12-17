import { OrderRepository } from "@/domain/e-commerce/application/repositories/order-repository"
import { Order } from "@/domain/e-commerce/enterprise/entities/order"
import { prisma } from "../../prisma"
import { PrismaOrderMapper } from "../mappers/prisma-order-mapper"
import { PaginationParams } from "@/core/repositories/pagination-params"

export class PrismaOrderRepository implements OrderRepository {
  async findMany({page}: PaginationParams) {
    const orders = await prisma.order.findMany({
      skip: (page - 1) * 20,
      take: 20,
    })
        
    return orders.map(PrismaOrderMapper.toDomain)
  }

  async findManyByUserId(userId: string) {
    const orders = await prisma.order.findMany({where: {userId} })
     
    return orders.map(PrismaOrderMapper.toDomain)
  }

  async findById(id: string) {
    const order = await prisma.order.findUnique({where: {id} })
    
    if (!order) {
      return null
    }
    
    return PrismaOrderMapper.toDomain(order)
  }

  async create(order: Order) {
    const data = PrismaOrderMapper.toPrisma(order)
    
    await prisma.order.create({
      data,
    })
  }

  async edit(order: Order) {
    const data = PrismaOrderMapper.toPrisma(order)
    
    await prisma.order.update({
      where: { id: order.id.toString() },
      data,
    })
  }
}