import { Entity } from "@/core/entities/entity"
import { Optional } from "@/core/types/optional"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { ProductAttachmentList } from "./product-attachments-list"

export interface ProductProps {
  title: string
  description: string
  volume: string
  brand: string
  status: string
  gender: string
  price: number
  marketPrice: number
  costPrice: number
  attachments: ProductAttachmentList
  createdAt: Date
  updatedAt?: Date
}

export class Product extends Entity<ProductProps> {
  get title() {
    return this.props.title
  }

   get description() {
    return this.props.description
  }

   get volume() {
    return this.props.volume
  }

   get brand() {
    return this.props.brand
  }

   get status() {
    return this.props.status
  }

   get gender() {
    return this.props.gender
  }

   get price() {
    return this.props.price
  }

  get marketPrice() {
    return this.props.marketPrice
  }
  
  get costPrice() {
    return this.props.costPrice
  }

  get attachments() {
    return this.props.attachments
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

  set title(title: string) {
    this.props.title = title
    this.touch()
  }

  set description(description: string) {
    this.props.description = description
    this.touch()
  }

  set volume(volume: string) {
    this.props.volume = volume
    this.touch()
  }

  set status(status: string) {
    this.props.status = status
    this.touch()
  }

  set price(price: number) {
    this.props.price = price
    this.touch()
  }

  set marketPrice(marketPrice: number) {
    this.props.marketPrice = marketPrice
    this.touch()
  }

   set costPrice(costPrice: number) {
    this.props.costPrice = costPrice
    this.touch()
  }

  set attachments(attachments: ProductAttachmentList) {
    this.props.attachments = attachments
    this.touch()
  }

  static create(props: Optional<ProductProps,'attachments' | 'createdAt' >, id?: UniqueEntityID) {
    const product = new Product({
      ...props,
      createdAt: props.createdAt ?? new Date(),
      attachments: props.attachments ?? new ProductAttachmentList,
    }, id)

    return product
  }
}