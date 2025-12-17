import { Either, left, right } from "@/core/either"
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error"
import { AddressRepository } from "../repositories/address-repository"
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error"


interface EditAddressUseCaseRequest {
  userId: string
  addressId: string
  name: string
  street: string
  number: string
  additionalInfo: string
  city: string
  state: string
  zipCode:string
  country: string
}

type EditAddressUseCaseResponse = Either<ResourceNotFoundError | ResourceNotFoundError, {}>

export class EditAddressUseCase {
  constructor(private AddressRepository: AddressRepository) {}

  async execute({
    userId,
    addressId,
    name,
    street,
    number,
    additionalInfo,
    city,
    state,
    zipCode,
    country
  }: EditAddressUseCaseRequest): Promise<EditAddressUseCaseResponse> {
    const address = await this.AddressRepository.findById(addressId)

    if (!address) {
      return left(new ResourceNotFoundError())
    }

    if (address.userId.toString() !== userId) {
      return left(new NotAllowedError())
    }

    address.name = name
    address.street = street
    address.number = number
    address.additionalInfo = additionalInfo
    address.city = city
    address.state = state
    address.zipCode = zipCode
    address.country = country

    await this.AddressRepository.edit(address)

    return right({})
  } 
}