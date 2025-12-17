import { AddressRepository } from "@/domain/e-commerce/application/repositories/address-repository"
import { Address } from "@/domain/e-commerce/enterprise/entities/address"
import { prisma } from "../../prisma"
import { PrismaAddressMapper } from "../mappers/prisma-address-mapper"


export class PrismaAddressRepository implements AddressRepository {
  async findManyByUserId(id: string) {
    const address = await prisma.address.findMany({
      where: { userId: id },
    })
    
    return address.map(PrismaAddressMapper.toDomain)
  }

  async findById(id: string): Promise<Address | null> {
    const address = await prisma.address.findUnique({where: {id} })
    
    if (!address) {
      return null
    }
    
    return PrismaAddressMapper.toDomain(address)
  }

  async create(address: Address) {
    const data = PrismaAddressMapper.toPrisma(address)
        
    await prisma.address.create({
      data,
    })
  }

  async delete(address: Address): Promise<void> {
    await prisma.address.delete({
      where: { id: address.id.toString() },
    })
  }

  async edit(address: Address) {
    const data = PrismaAddressMapper.toPrisma(address)
        
    await prisma.address.update({
      where: { id: address.id.toString() },
      data,
    })
  }
}