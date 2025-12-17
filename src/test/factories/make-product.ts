import { faker } from "@faker-js/faker"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Product, ProductProps } from "@/domain/e-commerce/enterprise/entities/product"

export function makeProduct(override: Partial<ProductProps> = {}, id?: UniqueEntityID) {
  const product = Product.create({
    title: faker.lorem.sentence(),
    description: faker.lorem.text(),
    volume: faker.lorem.word(),
    brand:  faker.lorem.word(),
    status: faker.lorem.word(),
    gender: faker.lorem.word(),
    price: faker.number.float(),
    marketPrice: faker.number.float(),
    costPrice: faker.number.float(),
    ...override
  }, id);

  return product
}