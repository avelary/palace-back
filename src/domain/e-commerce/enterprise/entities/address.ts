import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Optional } from "@/core/types/optional"

export interface AddressProps {
  userId: UniqueEntityID
  name: string
  street: string
  number: string
  additionalInfo: string 
  city: string
  state: string
  zipCode:string
  country: string
  createdAt: Date
}

export class Address extends Entity<AddressProps> {

  get userId() {
    return this.props.userId
  }

  get name() {
    return this.props.name
  }

  get street() {
    return this.props.street
  }

  get number() {
    return this.props.number
  }

  get additionalInfo() {
    return this.props.additionalInfo
  }

  get city() {
    return this.props.city
  }

  get state() {
    return this.props.state
  }

  get zipCode() {
    return this.props.zipCode
  }

  get country() {
    return this.props.country
  }

  get createdAt() {
    return this.props.createdAt
  }

  set name(name: string) {
    this.props.name = name
  }

  set street(street: string) {
    this.props.street = street
  }

  set number(number: string) {
    this.props.number = number
  }

  set additionalInfo(additionalInfo: string) {
    this.props.additionalInfo = additionalInfo
  }

  set city(city: string) {
    this.props.city = city
  }

  set state(state: string) {
    this.props.state = state
  }

  set zipCode(zipCode: string) {
    this.props.zipCode = zipCode
  }

  set country(country: string) {
    this.props.country = country
  }

  static create(props: Optional<AddressProps, 'createdAt' >, id?: UniqueEntityID) {
    const address = new Address({
      ...props,
      createdAt: props.createdAt ?? new Date()
    }, id)
  
    return address
  }
}