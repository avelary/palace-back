import { UserRepository } from "../repositories/user-repository"
import { Encrypter } from "@/domain/e-commerce/application/encryption/encrypter"

export class RefreshTokenUseCase {
  constructor(
    private userRepository: UserRepository,
    private encrypter: Encrypter
  ) {}

  async execute(userId: string) {
    const user = await this.userRepository.findById(userId)
    if (!user) throw new Error("Usuário não encontrado")

    // Cria um novo token JWT com os dados atualizados
    const accessToken = await this.encrypter.encrypt({
      sub: user.id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      gender: user.gender,
      image: user.image,
    })

    return {
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        gender: user.gender,
        image: user.image,
      },
    }
  }
}
