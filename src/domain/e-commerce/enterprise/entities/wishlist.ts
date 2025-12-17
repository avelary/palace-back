import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Optional } from "@/core/types/optional"

export interface WishlistProps {
  userId: UniqueEntityID
  productId: UniqueEntityID
  createdAt: Date
}

export class Wishlist extends Entity<WishlistProps> {

  get userId() {
    return this.props.userId
  }

  get productId() {
    return this.props.productId
  }

  get createdAt() {
    return this.props.createdAt
  }

  set productId(productId: UniqueEntityID) {
    this.props.productId = productId
  }

  static create(props: Optional<WishlistProps, 'createdAt' >, id?: UniqueEntityID) {
    const wishlist = new Wishlist({
      ...props,
      createdAt: props.createdAt ?? new Date(),
    }, id)

    return wishlist
  }
}
