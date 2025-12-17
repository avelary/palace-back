import { WishlistRepository } from "@/domain/e-commerce/application/repositories/wishlist-repository"
import { Wishlist } from "@/domain/e-commerce/enterprise/entities/wishlist"
import { prisma } from "../../prisma"
import { PrismaWishlistMapper } from "../mappers/prisma-wishlist-mapper"

export class PrismaWishlistRepository implements WishlistRepository {
  async findByProductAndUserId(userId: string, productId: string) {
    const wishlist = await prisma.wishlist.findFirst({ where: {userId, productId }})

    if(!wishlist) {
      return null
    }

    return PrismaWishlistMapper.toDomain(wishlist)
  }
  
  async findByProductId(id: string) {
    const wishlist = await prisma.wishlist.findFirst({ where: {productId: id} })
    
    if(!wishlist) {
      return null
    }

    return PrismaWishlistMapper.toDomain(wishlist)
  }

  async findManyByUserId(id: string) {
    const wishlist = await prisma.wishlist.findMany({where: {userId: id} })

    return wishlist.map(PrismaWishlistMapper.toDomain)
  }

  async findById(id: string) {
    const wishlist = await prisma.wishlist.findUnique({where: {id} })
    
    if (!wishlist) {
      return null
    }
    
    return PrismaWishlistMapper.toDomain(wishlist)
  }

  async create(wishlist: Wishlist) {
    const data = PrismaWishlistMapper.toPrisma(wishlist)
    
    await prisma.wishlist.create({
      data,
    })
  }

  async delete(wishlist: Wishlist) {
    await prisma.wishlist.delete({
      where: { id: wishlist.id.toString() },
    })
  }
}