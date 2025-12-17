import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { OrderItem } from '@/domain/e-commerce/enterprise/entities/order-item'
import { OrderItem as prismaOrderItem, Prisma } from '@prisma/client'

export class PrismaOrderItemMapper {
  static toDomain(raw: prismaOrderItem): OrderItem {
    return OrderItem.create({
      orderId: new UniqueEntityID(raw.orderId),
      productId: new UniqueEntityID(raw.productId),
      quantity: raw.quantity,
      createdAt: raw.createdAt,
    }, new UniqueEntityID(raw.id))
  }

  static toPrisma(item: OrderItem): Omit<Prisma.OrderItemUncheckedCreateInput, 'updatedAt'> {
    return {
      id: item.id.toString(),
      orderId: item.orderId.toString(),
      productId: item.productId.toString(),
      quantity: item.quantity,
      createdAt: item.createdAt,
    }
  }
}