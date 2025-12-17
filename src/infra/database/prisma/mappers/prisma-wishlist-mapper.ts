import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Wishlist } from '@/domain/e-commerce/enterprise/entities/wishlist'
import { Wishlist as prismaWishlist, Prisma} from '@prisma/client'

export class PrismaWishlistMapper {
  static toDomain(raw: prismaWishlist): Wishlist {
    return Wishlist.create({
      userId: new UniqueEntityID(raw.userId),
      productId: new UniqueEntityID(raw.productId),
      createdAt: raw.createdAt,
    }, new UniqueEntityID(raw.id))
  }

  static toPrisma(wishlist: Wishlist): Omit<Prisma.WishlistUncheckedCreateInput, 'updatedAt'> {
    return {
      id: wishlist.id.toString(),
      userId: wishlist.userId.toString(),
      productId: wishlist.productId.toString() ,
      createdAt: wishlist.createdAt,
    }
  }
}