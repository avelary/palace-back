import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Address } from '@/domain/e-commerce/enterprise/entities/address'
import { Address as prismaAddress, Prisma } from '@prisma/client'

export class PrismaAddressMapper {
  static toDomain(raw: prismaAddress): Address {
    return Address.create({
      userId: new UniqueEntityID(raw.userId),
      name: raw.name,
      street: raw.street,
      number: raw.number,
      additionalInfo: raw.additionalInfo,
      city: raw.city,
      state: raw.state,
      zipCode: raw.zipCode,
      country: raw.country,
      createdAt: raw.createdAt,
    }, new UniqueEntityID(raw.id))
  }

  static toPrisma(address: Address): Omit<Prisma.AddressUncheckedCreateInput, 'updatedAt'> {
    return {
      id: address.id.toString(),
      userId: address.userId.toString(),
      name: address.name,
      street: address.street,
      number: address.number,
      additionalInfo: address.additionalInfo,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      createdAt: address.createdAt,
    }
  }
}