import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Optional } from "@/core/types/optional"
import { OrderItemsList } from "./order-items-list"

export interface OrderProps {
  userId: UniqueEntityID
  totalAmount: number
  status: string
  address: string
  items: OrderItemsList
  createdAt: Date
  updatedAt?: Date
}

export class Order extends Entity<OrderProps> {
  get userId() {
    return this.props.userId
  }

  get totalAmount() {
    return this.props.totalAmount
  }

  get status() {
    return this.props.status
  }

  get address() {
    return this.props.address
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get items() {
    return this.props.items
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set totalAmount(value: number) {
    this.props.totalAmount = value
    this.touch()
  }

  set status(status: string) {
    this.props.status = status
    this.touch()
  }

  set address(address: string) {
    this.props.address = address
    this.touch()
  }

  set items(items: OrderItemsList) {
    this.props.items = items
    this.touch()
  }

  
  static create(
    props: Optional<OrderProps, "createdAt" >,
    id?: UniqueEntityID
  ) {
    return new Order(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    )
  }
}
