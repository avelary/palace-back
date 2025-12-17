import { FastifyTypedInstance } from '@/infra/types/provider'
import { PrismaCartRepository } from '@/infra/database/prisma/repositories/prisma-cart-repository'
import { CreateCartUseCase } from '@/domain/e-commerce/application/use-cases/create-cart'
import { CreateCartController } from '../controllers.ts/create-cart'
import { verifyJWT } from '../middleware/verify-jwt'

export async function cartRoutes(app: FastifyTypedInstance) {
  app.addHook('onRequest', verifyJWT)
  
  const cartRepository = new PrismaCartRepository()

  // CREATE
  const createCartUseCase = new CreateCartUseCase(cartRepository)
  const createCartController = new CreateCartController(createCartUseCase, cartRepository)

  app.post('/', async (req, reply) => {
    return createCartController.handle(req, reply)
  })
}
