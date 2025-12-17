import { FastifyRequest, FastifyReply } from 'fastify'
import { FetchOrdersByUserIdUseCase } from '@/domain/e-commerce/application/use-cases/fetch-orders-by-user-id'

export class FetchOrdersByUserIdController {
  constructor(private fetchOrdersByUserIdUseCase: FetchOrdersByUserIdUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.sub

    const result = await this.fetchOrdersByUserIdUseCase.execute({ userId })

    if (result.isLeft()) {
      return reply.status(400).send({ message: 'Failed to fetch orders' })
    }

    const { orders } = result.value

    return reply.status(200).send({
      orders: orders.map((p) => ({
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
