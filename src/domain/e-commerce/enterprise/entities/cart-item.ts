import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Optional } from "@/core/types/optional"

export interface CartItemProps {
  cartId: UniqueEntityID
  productId: UniqueEntityID
  quantity: number
  createdAt: Date
}

export class CartItem extends Entity<CartItemProps> {

  get cartId() {
    return this.props.cartId
  }

  get productId() {
    return this.props.productId
  }

  get quantity() {
    return this.props.quantity
  }

  get createdAt() {
    return this.props.createdAt
  }

  set productId(productId: UniqueEntityID) {
    this.props.productId = productId
  }

  set quantity(quantity: number) {
    this.props.quantity = quantity
  }

  static create(props: Optional<CartItemProps, 'createdAt' >, id?: UniqueEntityID) {
    const item = new CartItem({
      ...props,
      createdAt: props.createdAt ?? new Date(),
    }, id)

    return item
  }
}
