import { AuthenticateUseCase } from "@/domain/e-commerce/application/use-cases/authenticate"
import { AuthenticateController } from "../controllers.ts/authenticate"
import { PrismaUserRepository } from "@/infra/database/prisma/repositories/prisma-user-repository"
import { FastifyTypedInstance } from "@/infra/types/provider"
import { BcryptHasher } from "@/infra/encryption/bcrypt-hasher"
import { JwtEncrypter } from "@/infra/encryption/jwt-encrypter"
import { RefreshTokenUseCase } from "@/domain/e-commerce/application/use-cases/refresh-token"
import { RefreshTokenController } from "../controllers.ts/refresh-token"
import { verifyJWT } from "../middleware/verify-jwt"

export async function authenticateRoutes(app: FastifyTypedInstance) {
  const userRepository = new PrismaUserRepository()
  const hasher = new BcryptHasher()
  const encrypter = new JwtEncrypter(app)

  // USER ATHENTICATE
  const authenticateUseCase = new AuthenticateUseCase(userRepository, hasher, encrypter)
  const authenticateController = new AuthenticateController(authenticateUseCase)
  
  app.post('/session', async (req, reply) => {
    return authenticateController.handle(req, reply)
  })

  // USER PROFILE
  app.get('/me', async (request, reply) => {
    await request.jwtVerify()

    console.log(request.user)

    return { user: request.user }
  })

  // REFRESH USER
  const refreshTokenUseCase = new RefreshTokenUseCase(userRepository, encrypter)
  const refreshTokenController = new RefreshTokenController(refreshTokenUseCase)
  
  app.post(
    "/refresh",
    { onRequest: [verifyJWT] },
    async (req, reply) => refreshTokenController.handle(req, reply)
  )
}
