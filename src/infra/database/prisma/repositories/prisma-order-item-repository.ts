import { OrderItemRepository } from "@/domain/e-commerce/application/repositories/order-item-repository"
import { prisma } from "../../prisma"
import { PrismaOrderItemMapper } from "../mappers/prisma-order-item-mapper"
import { OrderItem } from "@/domain/e-commerce/enterprise/entities/order-item"


export class PrismaOrderItemRepository implements OrderItemRepository {
  async findManyByOrderId(id: string) {
    const items = await prisma.orderItem.findMany({
      where: { orderId: id },
    })
      
    return items.map(PrismaOrderItemMapper.toDomain)
  }

  async create(orderItem: OrderItem): Promise<void> {
    const data = PrismaOrderItemMapper.toPrisma(orderItem)
    await prisma.orderItem.create({
      data
    })
  }
}