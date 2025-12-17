import { FastifyTypedInstance } from '@/infra/types/provider'
import { PrismaOrderRepository } from '@/infra/database/prisma/repositories/prisma-order-repository'
import { CreateOrderUseCase } from '@/domain/e-commerce/application/use-cases/create-order'
import { CreateOrderController } from '../controllers.ts/create-order'
import { FetchOrdersUseCase } from '@/domain/e-commerce/application/use-cases/fetch-orders'
import { FetchOrdersController } from '../controllers.ts/fetch-orders'
import { EditOrderUseCase } from '@/domain/e-commerce/application/use-cases/edit-order'
import { EditOrderController } from '../controllers.ts/edit-order'
import { FetchOrdersByUserIdUseCase } from '@/domain/e-commerce/application/use-cases/fetch-orders-by-user-id'
import { FetchOrdersByUserIdController } from '../controllers.ts/fetch-orders-by-user-id'
import { verifyJWT } from '../middleware/verify-jwt'
import { verifyUserRole } from '../middleware/verify-user-role'


export async function orderRoutes(app: FastifyTypedInstance) {
  app.addHook('onRequest', verifyJWT)
  const orderRepository = new PrismaOrderRepository()

  // FETCH BY USER ID
  const fetchOrdersByUserIdUseCase = new FetchOrdersByUserIdUseCase(orderRepository)
  const fetchOrdersByUserIdController = new FetchOrdersByUserIdController(fetchOrdersByUserIdUseCase)

  app.get('/user', async (req, reply) => {
    return fetchOrdersByUserIdController.handle(req, reply)
  })
  
  // FETCH (GET ALL)
  const fetchOrdersUseCase = new FetchOrdersUseCase(orderRepository)
  const fetchOrdersController = new FetchOrdersController(fetchOrdersUseCase)

  app.get('/',
    { onRequest: [verifyJWT, verifyUserRole('manager')] },
    async (req, reply) => {
    return fetchOrdersController.handle(req, reply)
  })

  // CREATE
  const createOrderUseCase = new CreateOrderUseCase(orderRepository)
  const createOrderController = new CreateOrderController(createOrderUseCase)

  app.post('/', async (req, reply) => {
    return createOrderController.handle(req, reply)
  })

  //UPDATE
  const editOrderUseCase = new EditOrderUseCase(orderRepository)
  const editOrderController = new EditOrderController(editOrderUseCase)

  app.patch('/', async (req, reply) => {
    return editOrderController.handle(req, reply)
  })
}
