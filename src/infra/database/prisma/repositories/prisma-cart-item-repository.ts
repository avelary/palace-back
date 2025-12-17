import { CartItemRepository } from "@/domain/e-commerce/application/repositories/cart-item-repository"
import { prisma } from "../../prisma"
import { PrismaCartItemMapper } from "../mappers/prisma-cart-item-mapper"
import { CartItem } from "@/domain/e-commerce/enterprise/entities/cart-item"


export class PrismaCartItemRepository implements CartItemRepository {
  async findByCartIdAndProductId(cartId: string, productId: string) {
    const item = await prisma.cartItem.findFirst({ where: {cartId, productId} })

    if(!item) {
      return null
    }

    return PrismaCartItemMapper.toDomain(item)
  }

  async findManyByCartId(id: string) {
    const items = await prisma.cartItem.findMany({
      where: { cartId: id },
    })
    
    return items.map(PrismaCartItemMapper.toDomain)
  }

  async findById(id: string) {
    const item = await prisma.cartItem.findUnique({ where: {id} })

    if(!item) {
      return null
    }

    return PrismaCartItemMapper.toDomain(item)
  }

  async create(cartItem: CartItem) {
    const data = PrismaCartItemMapper.toPrisma(cartItem)
    await prisma.cartItem.create({
      data
    })
  }

  async delete(cartItem: CartItem) {
    await prisma.cartItem.delete({
      where: { id: cartItem.id.toString() },
    })
  }

  async deleteManyByCartId(id: string) {
    await prisma.cartItem.deleteMany({
      where: { cartId: id },
    })
  }

  async edit(cartItem: CartItem) {
    const data = PrismaCartItemMapper.toPrisma(cartItem)
        
    await prisma.cartItem.update({
      where: { id: cartItem.id.toString() },
      data,
    })
  }
}