import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Optional } from "@/core/types/optional"

export interface PaymentProps {
  orderId: UniqueEntityID
  amount: number
  status: string
  paymentMethod: string
  transactionId: string
  createdAt: Date
  updatedAt?: Date
}


export class Payment extends Entity<PaymentProps> {

  get orderId() {
    return this.props.orderId
  }

  get amount() {
    return this.props.amount
  }

  get status() {
    return this.props.status
  }

  get paymentMethod() {
    return this.props.paymentMethod
  }

  get transactionId() {
    return this.props.transactionId
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

  set amount(amount: number) {
    this.props.amount = amount
    this.touch()
  }

  set status(status: string) {
    this.props.status = status
    this.touch()
  }

  set paymentMethod(paymentMethod: string) {
    this.props.paymentMethod = paymentMethod
    this.touch()
  }

  static create(props: Optional<PaymentProps, 'createdAt' >, id?: UniqueEntityID) {
    const payment = new Payment({
      ...props,
      createdAt: props.createdAt ?? new Date()
    }, id)
  
    return payment
  }
}
