import { Either, right } from "@/core/either"
import { AddressRepository } from "../repositories/address-repository"
import { Address } from "../../enterprise/entities/address"

interface GetAddressesByUserIdUseCaseRequest {
  userId: string
}

type GetAddressesByUserIdUseCaseResponse = Either<null, { addresses: Address[] }>

export class GetAddressesByUserIdUseCase {
  constructor(private addressRepository: AddressRepository) {}

  async execute({
    userId,
  }: GetAddressesByUserIdUseCaseRequest): Promise<GetAddressesByUserIdUseCaseResponse> {
    const addresses = await this.addressRepository.findManyByUserId(userId)

    return right({ addresses })
  }
}
