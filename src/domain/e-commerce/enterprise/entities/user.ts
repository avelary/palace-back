import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Optional } from "@/core/types/optional"

export interface UserProps {
  role: string
  name: string
  email: string
  password: string
  gender: string
  image?: string
  createdAt: Date
  updatedAt?: Date
}

export class User extends Entity<UserProps> {
  get role() {
    return this.props.role
  }

  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  get gender() {
    return this.props.gender
  }

  get image() {
    return this.props.image ?? ''
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

  set role(role: string) {
    this.props.role = role
    this.touch()
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  set email(email: string) {
    this.props.email = email
    this.touch()
  }

  set password(password: string) {
    this.props.password = password
    this.touch()
  }
  
  set gender(gender: string) {
    this.props.gender = gender
    this.touch()
  }

  set image(image: string) {
    this.props.image = image
    this.touch()
  }

  static create(props: Optional<UserProps,'image' | 'createdAt' >, id?: UniqueEntityID) {
    const product = new User({
      ...props,
      createdAt: props.createdAt ?? new Date()
    }, id)
  
    return product
  }
}