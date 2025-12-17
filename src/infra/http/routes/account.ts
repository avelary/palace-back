import { CreateAccountUseCase } from "@/domain/e-commerce/application/use-cases/create-account"
import { CreateAccountController } from "../controllers.ts/create-account"
import { PrismaUserRepository } from "@/infra/database/prisma/repositories/prisma-user-repository"
import { FastifyTypedInstance } from "@/infra/types/provider"
import { BcryptHasher } from "@/infra/encryption/bcrypt-hasher"
import { EditAccountUseCase } from "@/domain/e-commerce/application/use-cases/edit-user"
import { EditAccountController } from "../controllers.ts/edit-account"
import { DeleteAccountUseCase } from "@/domain/e-commerce/application/use-cases/delete-account"
import { DeleteAccountController } from "../controllers.ts/delete-account"

export async function userRoutes(app: FastifyTypedInstance) {
  const userRepository = new PrismaUserRepository()
  const hasher = new BcryptHasher()

  // CREATE
  const createAccountUseCase = new CreateAccountUseCase(userRepository, hasher)
  const createAccountController = new CreateAccountController(createAccountUseCase)

  app.post('/', async (req, reply) => {
    return createAccountController.handle(req, reply)
  })

  //DELETE
  const deleteAccountUseCase = new DeleteAccountUseCase(userRepository)
  const deleteAccountController = new DeleteAccountController(deleteAccountUseCase)

  app.delete('/', async (req, reply) => {
    return deleteAccountController.handle(req, reply)
  })

  //UPDATE
  const editAccountUseCase = new EditAccountUseCase(userRepository)
  const editAccountController = new EditAccountController(editAccountUseCase)

  app.patch('/', async (req, reply) => {
    return editAccountController.handle(req, reply)
  })
}
