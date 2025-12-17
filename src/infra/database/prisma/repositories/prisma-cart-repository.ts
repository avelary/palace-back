import { prisma } from "../../prisma"
import { PrismaCartMapper } from "../mappers/prisma-cart-mapper"
import { CartRepository } from "@/domain/e-commerce/application/repositories/cart-repository"
import { Cart } from "@/domain/e-commerce/enterprise/entities/cart"


export class PrismaCartRepository implements CartRepository {
  async findByUserId(id: string) {
    const cart = await prisma.cart.findFirst({where: {userId: id} })

    if (!cart) {
      return null
    }

    return PrismaCartMapper.toDomain(cart)
  }

  async findById(id: string) {
    const cart = await prisma.cart.findUnique({where: {id} })

    if (!cart) {
      return null
    }

    return PrismaCartMapper.toDomain(cart)
  }

  async create(cart: Cart) {
    const data = PrismaCartMapper.toPrisma(cart)
        
    await prisma.cart.create({
      data,
    })
  }

  async delete(cart: Cart) {
    await prisma.inventory.delete({
      where: { id: cart.id.toString() },
    })
  }
  
  async edit(cart: Cart) {
    const data = PrismaCartMapper.toPrisma(cart)
        
    await prisma.cart.update({
      where: { id: cart.id.toString() },
        data,
    })
  } 
}