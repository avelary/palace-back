import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { CartItem } from '@/domain/e-commerce/enterprise/entities/cart-item'
import { CartItem as prismaCartItem, Prisma } from '@prisma/client'

export class PrismaCartItemMapper {
  static toDomain(raw: prismaCartItem): CartItem {
    return CartItem.create({
      cartId: new UniqueEntityID(raw.cartId),
      productId: new UniqueEntityID(raw.productId),
      quantity: raw.quantity,
      createdAt: raw.createdAt,
    }, new UniqueEntityID(raw.id))
  }

  static toPrisma(item: CartItem): Omit<Prisma.CartItemUncheckedCreateInput, 'updatedAt'> {
    return {
      id: item.id.toString(),
      cartId: item.cartId.toString(),
      productId: item.productId.toString(),
      quantity: item.quantity,
      createdAt: item.createdAt,
    }
  }
}