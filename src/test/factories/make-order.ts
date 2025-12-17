import { faker } from "@faker-js/faker"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Order, OrderProps } from "@/domain/e-commerce/enterprise/entities/order"
import { OrderItemsList } from "@/domain/e-commerce/enterprise/entities/order-items-list"


export function makeOrder(override: Partial<OrderProps> = {}, id?: UniqueEntityID) {
  const order = Order.create({
    userId: new UniqueEntityID(),
    totalAmount: faker.number.float(),
    status: 'pending',
    address: faker.location.city(),
    items: new OrderItemsList(),
    ...override
  }, id)

  return order
}