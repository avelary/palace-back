import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Order } from '@/domain/e-commerce/enterprise/entities/order'
import { Order as prismaOrder, Prisma, OrderStatus } from '@prisma/client'
import { OrderItemsList } from '@/domain/e-commerce/enterprise/entities/order-items-list'

export class PrismaOrderMapper {
  static toDomain(raw: prismaOrder): Order {
    return Order.create({
      userId: new UniqueEntityID(raw.userId),
      totalAmount: raw.totalAmount,
      status: raw.status,
      address: raw.address,
      items: new OrderItemsList([]),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt
    }, new UniqueEntityID(raw.id))
    
  }

  static toPrisma(order: Order): Omit<Prisma.OrderUncheckedCreateInput, 'updatedAt'> {
    return {
      id: order.id.toString(),
      userId: order.userId.toString(),
      totalAmount: order.totalAmount,
      status: order.status as OrderStatus,
      address: order.address,
      createdAt: order.createdAt,
    }
  }
  
}
