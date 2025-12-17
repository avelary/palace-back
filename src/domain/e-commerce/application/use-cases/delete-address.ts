import { left, right, Either } from "@/core/either"
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error"
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error"
import { AddressRepository } from "../repositories/address-repository"

interface DeleteaddressUseCaseRequest {
  userId: string
  addressId: string
}

type DeleteAddressUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>

export class DeleteAddressUseCase {
  constructor(private addressRepository: AddressRepository) {}

  async execute({
    userId,
    addressId
  }: DeleteaddressUseCaseRequest): Promise<DeleteAddressUseCaseResponse> {
    const address = await this.addressRepository.findById(addressId)

    if (!address) {
      return left(new ResourceNotFoundError())
    }

    if(address.userId.toString() !== userId) {
      return left(new NotAllowedError())
    }

    await this.addressRepository.delete(address)

    return right({})
  }
}
