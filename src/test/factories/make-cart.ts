import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Cart, CartProps } from "@/domain/e-commerce/enterprise/entities/cart"

export function makeCart(override: Partial<CartProps> = {}, id?: UniqueEntityID) {
  const cart =  Cart.create({
    userId: new UniqueEntityID(),
    ...override
  }, id)

  return cart
}