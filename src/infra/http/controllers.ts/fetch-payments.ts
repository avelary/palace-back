import { FastifyRequest, FastifyReply } from 'fastify'
import { FetchPaymentsUseCase } from '@/domain/e-commerce/application/use-cases/fetch-payments'
import { z } from 'zod'

export class FetchPaymentsController {
  constructor(private fetchPaymentsUseCase: FetchPaymentsUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const querySchema = z.object({
      page: z.coerce.number().min(1).default(1),
    })

    const { page } = querySchema.parse(request.query)

    const result = await this.fetchPaymentsUseCase.execute({ page })

    if (result.isLeft()) {
      return reply.status(400).send({ message: 'Failed to fetch payments' })
    }

    const { payment } = result.value

    return reply.status(200).send({
      payments: payment.map((p) => ({
        id: p.id.toString(),
        orderId: p.orderId.toString(),
        amount: p.amount,
        status: p.status,
        paymentMethod: p.paymentMethod,
        transationId: p.transactionId,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt
      })),
    })
  }
}
