import { FastifyRequest, FastifyReply } from 'fastify'
import { FetchOrdersUseCase } from '@/domain/e-commerce/application/use-cases/fetch-orders'
import { z } from 'zod'

export class FetchOrdersController {
  constructor(private fetchOrdersUseCase: FetchOrdersUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const querySchema = z.object({
      page: z.coerce.number().min(1).default(1),
    })

    const { page } = querySchema.parse(request.query)

    const result = await this.fetchOrdersUseCase.execute({ page })

    if (result.isLeft()) {
      return reply.status(400).send({ message: 'Failed to fetch orders' })
    }

    const { order } = result.value

    return reply.status(200).send({
      orders: order.map((p) => ({
        id: p.id.toString(),
        userId: p.userId.toString(),
        totalAmount: p.totalAmount,
        status: p.status,
        address: p.address,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
      })),
    })
  }
}
