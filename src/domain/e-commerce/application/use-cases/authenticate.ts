import { right, Either, left } from "@/core/either"
import { UserRepository } from "../repositories/user-repository"
import { HashComparer } from "../encryption/hash-comparer"
import { Encrypter } from "../encryption/encrypter"
import { WrongCredentialsError } from "@/core/errors/errors/wrong-credentials-error"

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

type AuthenticateUseCaseResponse = Either<WrongCredentialsError, {
  accessToken: string
}>

export class AuthenticateUseCase {
  constructor(
    private userRepository: UserRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter
  ) {}

  async execute({
    email,
    password
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email)
  
    if(!user) {
      return left(new WrongCredentialsError)
    }

    const isPasswordIsValid = await this.hashComparer.compare(password, user.password)

    if(!isPasswordIsValid) {
      return left(new WrongCredentialsError)
    }

    const accessToken = await this.encrypter.encrypt({ sub: user.id.toString(), name: user.name, email: user.email, role: user.role, gender: user.gender, image: user.image })
    
    return right({ accessToken })
  } 
}