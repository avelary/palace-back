import { FastifyTypedInstance } from '@/infra/types/provider'
import { PrismaProductRepository } from '@/infra/database/prisma/repositories/prisma-product-repository'
import { CreateProductUseCase } from '@/domain/e-commerce/application/use-cases/create-product'
import { CreateProductController } from '../controllers.ts/create-product'
import { FetchProductsUseCase } from '@/domain/e-commerce/application/use-cases/fetch-products'
import { FetchProductController } from '../controllers.ts/fetch-product'
import { EditProductUseCase } from '@/domain/e-commerce/application/use-cases/edit-product'
import { EditProductController } from '../controllers.ts/edit-product'
import { DeleteProductController } from '../controllers.ts/delete-product'
import { DeleteProductUseCase } from '@/domain/e-commerce/application/use-cases/delete-product'
import { verifyJWT } from '../middleware/verify-jwt'
import { verifyUserRole } from '../middleware/verify-user-role'
import { GetProductByIdUseCase } from '@/domain/e-commerce/application/use-cases/get-product-by-id'
import { GetProductByIdController } from '../controllers.ts/get-product-by-id'


export async function productRoutes(app: FastifyTypedInstance) {
  const productRepository = new PrismaProductRepository()

  // GET BY ID
  const getProductByIdUseCase = new GetProductByIdUseCase(productRepository)
  const getProductByIdController = new GetProductByIdController(getProductByIdUseCase)

  app.get('/:productId', async (req, reply) => {
    return getProductByIdController.handle(req, reply)
  })

  // FETCH (GET ALL)
  const fetchProductsUseCase = new FetchProductsUseCase(productRepository)
  const fetchProductController = new FetchProductController(fetchProductsUseCase)

  app.get('/', async (req, reply) => {
    return fetchProductController.handle(req, reply)
  })

  // CREATE
  const createProductUseCase = new CreateProductUseCase(productRepository)
  const createProductController = new CreateProductController(createProductUseCase)

  app.post(
    '/',
    { onRequest: [verifyJWT, verifyUserRole('manager')] },
    async (req, reply) => {
      return createProductController.handle(req, reply)
    }
  )

  // DELETE
  const deleteProductsUseCase = new DeleteProductUseCase(productRepository)
  const deleteProductController = new DeleteProductController(deleteProductsUseCase)

  app.delete(
    '/:productId',
    { onRequest: [verifyJWT, verifyUserRole('manager')] },
    async (req, reply) => {
      return deleteProductController.handle(req, reply)
    }
  )

  // UPDATE
  const editProductsUseCase = new EditProductUseCase(productRepository)
  const editProductController = new EditProductController(editProductsUseCase)

  app.patch(
    '/',
    { onRequest: [verifyJWT, verifyUserRole('manager')] },
    async (req, reply) => {
      return editProductController.handle(req, reply)
    }
  )
}

