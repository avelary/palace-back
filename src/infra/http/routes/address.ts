import { CreateAddressUseCase } from "@/domain/e-commerce/application/use-cases/create-address"
import { PrismaAddressRepository } from "@/infra/database/prisma/repositories/prisma-address-repository"
import { FastifyTypedInstance } from "@/infra/types/provider"
import { CreateAddressController } from "../controllers.ts/create-address"
import { DeleteAddressController } from "../controllers.ts/delete-address"
import { DeleteAddressUseCase } from "@/domain/e-commerce/application/use-cases/delete-address"
import { EditAddressUseCase } from "@/domain/e-commerce/application/use-cases/edit-address"
import { EditAddressController } from "../controllers.ts/edit-address"
import { GetAddressesByUserIdUseCase } from "@/domain/e-commerce/application/use-cases/get-addresses-by-user-id"
import { GetAddressesByUserIdController } from "../controllers.ts/get-addresses-by-user-id"
import { verifyJWT } from "../middleware/verify-jwt"


export async function addressRoutes(app: FastifyTypedInstance) {
  app.addHook('onRequest', verifyJWT)
  
  const addressRepository = new PrismaAddressRepository()

  // GET
  const getAddressUseCase = new GetAddressesByUserIdUseCase(addressRepository)
  const getAddressController = new GetAddressesByUserIdController(getAddressUseCase)

  app.get('/', async (req, reply) => {
    return getAddressController.handle(req, reply)
  })
  
  // CREATE
  const createAddressUseCase = new CreateAddressUseCase(addressRepository)
  const createAddressController = new CreateAddressController(createAddressUseCase)
  
  app.post('/', async (req, reply) => {
    return createAddressController.handle(req, reply)
  })

  // DELETE
  const deleteAddressUseCase = new DeleteAddressUseCase(addressRepository)
  const deleteAddressController = new DeleteAddressController(deleteAddressUseCase)

  app.delete('/', async (req, reply) => {
    return deleteAddressController.handle(req, reply)
  })

  // UPDATE
  const editAddressUseCase = new EditAddressUseCase(addressRepository)
  const editAddressController = new EditAddressController(editAddressUseCase)

  app.patch('/', async (req, reply) => {
    return editAddressController.handle(req, reply)
  })
}
