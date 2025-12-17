import { faker } from "@faker-js/faker"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { OrderItem, OrderItemProps } from "@/domain/e-commerce/enterprise/entities/order-item"


export function makeOrderItem(override: Partial<OrderItemProps> = {}, id?: UniqueEntityID) {
  const cartItem = OrderItem.create({
    orderId: new UniqueEntityID(),
    productId: new UniqueEntityID(),
    quantity: faker.number.int(),
    ...override
  }, id)

  return cartItem
}