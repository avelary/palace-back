import { faker } from "@faker-js/faker"
import { CartItem, CartItemProps } from "@/domain/e-commerce/enterprise/entities/cart-item"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"


export function makeCartItem(override: Partial<CartItemProps> = {}, id?: UniqueEntityID) {
  const cartItem = CartItem.create({
    cartId: new UniqueEntityID(),
    productId: new UniqueEntityID(),
    quantity: faker.number.int(),
    ...override
  }, id)

  return cartItem
}