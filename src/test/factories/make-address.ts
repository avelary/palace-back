import { faker } from "@faker-js/faker"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Address, AddressProps } from "@/domain/e-commerce/enterprise/entities/address"

export function makeAddress(override: Partial<AddressProps> = {}, id?: UniqueEntityID) {
  const address =  Address.create({
    userId: new UniqueEntityID(),
    name: faker.location.country(),
    street: faker.location.street(),
    number: faker.location.buildingNumber(),
    additionalInfo: faker.location.secondaryAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    country: faker.location.country(),
    ...override
  }, id)

  return address
}