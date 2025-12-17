import { UserRepository } from "../repositories/user-repository"
import { left, right, Either } from "@/core/either"
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error"
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error"

interface DeleteAccountUseCaseRequest {
  authUserId: string
  userId: string
}

type DeleteAccountUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>

export class DeleteAccountUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    authUserId,
    userId
  }: DeleteAccountUseCaseRequest): Promise<DeleteAccountUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    if(user.id.toString() !== authUserId) {
      return left(new NotAllowedError())
    }

    await this.userRepository.delete(user)

    return right({})
  }
}
