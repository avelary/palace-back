import { User } from "../../enterprise/entities/user"
import { right, Either, left } from "@/core/either"
import { UserRepository } from "../repositories/user-repository"
import { HashGenerator } from "../encryption/hash-generator"
import { UserAlreadyExistsError } from "@/core/errors/errors/user-already-exists-error"

interface CreateAccountUseCaseRequest {
  name: string
  email: string
  password: string
  gender: string
  image?: string
}

type CreateAccountUseCaseResponse = Either<UserAlreadyExistsError, {user: User}>

export class CreateAccountUseCase {
  constructor(
    private userRepository: UserRepository,
    private hashGenerator: HashGenerator
  ) {}

  async execute({
    name,
    email,
    password,
    gender,
  }: CreateAccountUseCaseRequest): Promise<CreateAccountUseCaseResponse> {
    const userWithSameEmail = await this.userRepository.findByEmail(email)

    if (userWithSameEmail) {
      return left(new UserAlreadyExistsError())
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const user = User.create({
      role: 'user',
      name,
      email,
      password: hashedPassword,
      gender
    })

    await this.userRepository.create(user)

    return right({ user })
  } 
}