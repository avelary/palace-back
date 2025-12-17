import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Optional } from "@/core/types/optional"

export interface InventoryProps {
  productId: UniqueEntityID
  quantityAvailable: number
  warehouseLocation: string
  createdAt: Date
  updatedAt?: Date
}

export class Inventory extends Entity<InventoryProps> {

  get productId() {
    return this.props.productId
  }

  get quantityAvailable() {
    return this.props.quantityAvailable
  }

  get warehouseLocation() {
    return this.props.warehouseLocation
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

  set quantityAvailable(quantity: number) {
    this.props.quantityAvailable = quantity
    this.touch()
  }

  set warehouseLocation(location: string) {
    this.props.warehouseLocation = location
    this.touch()
  }

  static create(props: Optional<InventoryProps, 'createdAt' >, id?: UniqueEntityID) {
    const inventory = new Inventory({
      ...props,
      createdAt: props.createdAt ?? new Date(),
    }, id)

    return inventory
  }
}

