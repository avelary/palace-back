import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Cart } from '@/domain/e-commerce/enterprise/entities/cart'
import { Cart as prismaCart, Prisma } from '@prisma/client'

export class PrismaCartMapper {
  static toDomain(raw: prismaCart): Cart {
    return Cart.create({
      userId: new UniqueEntityID(raw.userId),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt
    }, new UniqueEntityID(raw.id))
  }

  static toPrisma(cart: Cart): Omit<Prisma.CartUncheckedCreateInput, 'updatedAt'> {
    return {
      id: cart.id.toString(),
      userId: cart.userId.toString(),
      createdAt: cart.createdAt,
    }
  }
}