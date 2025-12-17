import { FastifyTypedInstance } from '@/infra/types/provider'
import { PrismaCartItemRepository } from '@/infra/database/prisma/repositories/prisma-cart-item-repository'
import { CreateCartItemUseCase } from '@/domain/e-commerce/application/use-cases/create-cart-item'
import { CreateCartItemController } from '../controllers.ts/create-cart-item'
import { GetCartItemsByCartIdUseCase } from '@/domain/e-commerce/application/use-cases/get-cart-items-by-cart-id'
import { GetCartItemsByUserIdController } from '../controllers.ts/get-cart-item-by-cart-id'
import { DeleteCartItemController } from '../controllers.ts/delete-cart-item'
import { DeleteCartItemUseCase } from '@/domain/e-commerce/application/use-cases/delete-cart-item'
import { verifyJWT } from '../middleware/verify-jwt'
import { PrismaCartRepository } from '@/infra/database/prisma/repositories/prisma-cart-repository'
import { EditCartItemController } from '../controllers.ts/edit-cart-item'
import { EditCartItemUseCase } from '@/domain/e-commerce/application/use-cases/edit-cart-item'


export async function cartItemRoutes(app: FastifyTypedInstance) {
  app.addHook('onRequest', verifyJWT)

  const cartitemRepository = new PrismaCartItemRepository()
  const cartRepository = new PrismaCartRepository()

  // FETCH (GET ALL)
  const getCartItemsUseCase = new GetCartItemsByCartIdUseCase(cartitemRepository)
  const getCartItemController = new GetCartItemsByUserIdController(getCartItemsUseCase, cartRepository)

  app.get('/', async (req, reply) => {
    return getCartItemController.handle(req, reply)
  })

  // CREATE
  const createCartItemUseCase = new CreateCartItemUseCase(cartitemRepository, cartRepository)
  const createCartItemController = new CreateCartItemController(createCartItemUseCase, cartRepository)

  app.post('/', async (req, reply) => {
    return createCartItemController.handle(req, reply)
  })

  // DELETE
  const deleteCartItemsUseCase = new DeleteCartItemUseCase(cartitemRepository)
  const deleteCartItemController = new DeleteCartItemController(deleteCartItemsUseCase, cartRepository)

  app.delete('/', async (req, reply) => {
    return deleteCartItemController.handle(req, reply)
  })

   // UPDATE
  const editCartItemUseCase = new EditCartItemUseCase(cartitemRepository)
  const editCartItemController = new EditCartItemController(editCartItemUseCase, cartRepository)

  app.patch('/', async (req, reply) => {
    return editCartItemController.handle(req, reply)
  })
}
