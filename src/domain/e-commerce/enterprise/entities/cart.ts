import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Optional } from "@/core/types/optional"
import { CartItemsList } from "./cart-items-list"

export interface CartProps {
  userId: UniqueEntityID
  items: CartItemsList
  createdAt: Date
  updatedAt?: Date
}

export class Cart extends Entity<CartProps> {

  get userId() {
    return this.props.userId
  }

  get items() {
    return this.props.items
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  protected setItems(items: CartItemsList) {
    this.props.items = items
    this.touch()
  }

  set items(items: CartItemsList) {
    this.props.items = items
    this.touch()
  }

  static create(
    props: Optional<CartProps, "createdAt" | "items" >,
    id?: UniqueEntityID
  ) {
    return new Cart(
      {
        ...props,
        items: props.items ?? new CartItemsList,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    )
  }
}
