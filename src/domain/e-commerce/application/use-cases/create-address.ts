import { right, Either } from "@/core/either"
import { Address } from "../../enterprise/entities/address"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { AddressRepository } from "../repositories/address-repository"

interface CreateAddressUseCaseRequest {
  userId: string
  name: string
  street: string
  number: string
  additionalInfo: string
  city: string
  state: string
  zipCode:string
  country: string
}

type CreateAddressUseCaseResponse = Either<null, {address: Address}>

export class CreateAddressUseCase {
  constructor(private addressRepository: AddressRepository) {}

  async execute({
    userId,
    name,
    street,
    number,
    additionalInfo,
    city,
    state,
    zipCode,
    country
  }: CreateAddressUseCaseRequest): Promise<CreateAddressUseCaseResponse> {
    const address = Address.create({
      userId: new UniqueEntityID(userId),
      name,
      street,
      number,
      additionalInfo,
      city,
      state,
      zipCode,
      country
    })

    await this.addressRepository.create(address)

    return right({ address })
  } 
}