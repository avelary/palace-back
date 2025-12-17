import { FastifyTypedInstance } from '@/infra/types/provider'
import { PrismaPaymentRepository } from '@/infra/database/prisma/repositories/prisma-payment-repository'
import { CreatePaymentUseCase } from '@/domain/e-commerce/application/use-cases/create-payment'
import { CreatePaymentController } from '../controllers.ts/create-payment'
import { EditPaymentUseCase } from '@/domain/e-commerce/application/use-cases/edit-payment'
import { EditPaymentController } from '../controllers.ts/edit-payment'
import { FetchPaymentsUseCase } from '@/domain/e-commerce/application/use-cases/fetch-payments'
import { FetchPaymentsController } from '../controllers.ts/fetch-payments'


export async function paymentRoutes(app: FastifyTypedInstance) {
  const PaymentRepository = new PrismaPaymentRepository()

  // PATCH (UPDATE)
  const fetchPaymentsUseCase = new FetchPaymentsUseCase(PaymentRepository)
  const fetchPaymentController = new FetchPaymentsController(fetchPaymentsUseCase)

  app.get('/', async (req, reply) => {
    return fetchPaymentController.handle(req, reply)
  })

  // CREATE
  const createPaymentUseCase = new CreatePaymentUseCase(PaymentRepository)
  const createPaymentController = new CreatePaymentController(createPaymentUseCase)

  app.post('/', async (req, reply) => {
    return createPaymentController.handle(req, reply)
  })

  // PATCH (UPDATE)
  const editPaymentsUseCase = new EditPaymentUseCase(PaymentRepository)
  const editPaymentController = new EditPaymentController(editPaymentsUseCase)

  app.patch('/', async (req, reply) => {
    return editPaymentController.handle(req, reply)
  })
}
