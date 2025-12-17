import { FastifyTypedInstance } from '@/infra/types/provider'
import { PrismaProductAttachmentsRepository } from '@/infra/database/prisma/repositories/prisma-product-attachments-repository'
import { CreateProductAttachmentUseCase } from '@/domain/e-commerce/application/use-cases/create-product-attachment'
import { CreateProductAttachmentController } from '../controllers.ts/create-product-attachment'
import { DeleteProductAttachmentUseCase } from '@/domain/e-commerce/application/use-cases/delete-product-attachment'
import { DeleteProductAttachmentController } from '../controllers.ts/delete-product-attachment'
import { GetProductAttachmentsByOrderIdUseCase } from '@/domain/e-commerce/application/use-cases/get-product-attachments-by-product-id'
import { GetProductAttachmentByProductIdController } from '../controllers.ts/get-product-attachments-by-product-id'
import { verifyJWT } from '../middleware/verify-jwt'
import { verifyUserRole } from '../middleware/verify-user-role'


export async function productAttachmentRoutes(app: FastifyTypedInstance) {
  const productattachmentRepository = new PrismaProductAttachmentsRepository()

  // FETCH (GET ALL)
  const fetchProductAttachmentUseCase = new GetProductAttachmentsByOrderIdUseCase(productattachmentRepository)
  const fetchProductAttachmentController = new GetProductAttachmentByProductIdController(fetchProductAttachmentUseCase)

  app.get('/', async (req, reply) => {
    return fetchProductAttachmentController.handle(req, reply)
  })

  // CREATE
  const createProductAttachmentUseCase = new CreateProductAttachmentUseCase(productattachmentRepository)
  const createProductAttachmentController = new CreateProductAttachmentController(createProductAttachmentUseCase)

  app.post('/', async (req, reply) => {
    return createProductAttachmentController.handle(req, reply)
  })

  // DELETE
  const deleteProductAttachmentAttachmentUseCase = new DeleteProductAttachmentUseCase(productattachmentRepository)
  const deleteProductAttachmentController = new DeleteProductAttachmentController(deleteProductAttachmentAttachmentUseCase)

  app.delete('/', async (req, reply) => {
    return deleteProductAttachmentController.handle(req, reply)
  })
}
