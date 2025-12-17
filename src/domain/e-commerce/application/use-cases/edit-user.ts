import { UserRepository } from "../repositories/user-repository"
import { left, right, Either } from "@/core/either"
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error"
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error"

interface EditAccountUseCaseRequest {
  authUserId: string
  userId: string
  name: string
  gender: string
  image: string
}

type EditAccountUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>

export class EditAccountUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    authUserId,
    userId,
    name,
    gender,
    image
  }: EditAccountUseCaseRequest): Promise<EditAccountUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    if (user.id.toString() !== authUserId) {
      return left(new NotAllowedError)
    }

    user.name = name
    user.gender = gender
    user.image = image

    await this.userRepository.edit(user)

    return right({})
  } 
}