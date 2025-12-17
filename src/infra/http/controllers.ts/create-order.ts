import { FastifyRequest, FastifyReply } from 'fastify'
import { CreateOrderUseCase } from '@/domain/e-commerce/application/use-cases/create-order'
import { z } from 'zod'

export class CreateOrderController {
  constructor(
    private createOrderUseCase: CreateOrderUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const OrderBodySchema = z.object({
      userId: z.string(),
      totalAmount: z.number(),
      productIds: z.array(z.string()),
      address: z.string()
    })

    const body = OrderBodySchema.parse(request.body)

    await this.createOrderUseCase.execute(body)

    return reply.status(201).send({
      message: 'Order created successfully'
    })
  }
}
