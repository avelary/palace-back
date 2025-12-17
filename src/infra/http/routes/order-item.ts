import { FastifyTypedInstance } from '@/infra/types/provider'
import { PrismaOrderItemRepository } from '@/infra/database/prisma/repositories/prisma-order-item-repository'
import { CreateOrderItemUseCase } from '@/domain/e-commerce/application/use-cases/create-order-item'
import { CreateOrderItemController } from '../controllers.ts/create-order-item'
import { GetOrderItemsByOrderIdUseCase } from '@/domain/e-commerce/application/use-cases/get-order-items-by-order-id'
import { GetOrderItemsByOrderIdController } from '../controllers.ts/get-order-items-by-order-id'


export async function orderitemRoutes(app: FastifyTypedInstance) {
  const orderitemRepository = new PrismaOrderItemRepository()

  // FETCH (GET ALL)
  const fetchOrderItemsUseCase = new GetOrderItemsByOrderIdUseCase(orderitemRepository)
  const fetchOrderItemController = new GetOrderItemsByOrderIdController(fetchOrderItemsUseCase)

  app.get('/', async (req, reply) => {
    return fetchOrderItemController.handle(req, reply)
  })

  // CREATE
  const createOrderItemUseCase = new CreateOrderItemUseCase(orderitemRepository)
  const createOrderItemController = new CreateOrderItemController(createOrderItemUseCase)

  app.post('/', async (req, reply) => {
    return createOrderItemController.handle(req, reply)
  })
}
