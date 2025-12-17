import { FastifyRequest, FastifyReply } from 'fastify'
import { CreateOrderItemUseCase } from '@/domain/e-commerce/application/use-cases/create-order-item'
import { z } from 'zod'

export class CreateOrderItemController {
  constructor(
    private createOrderItemUseCase: CreateOrderItemUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const OrderItemBodySchema = z.object({
      orderId: z.string(),
      productId: z.string(),
      quantity: z.number()
    })

    const { orderId, productId, quantity } = OrderItemBodySchema.parse(request.body)

    await this.createOrderItemUseCase.execute({
      orderId,
      productId,
      quantity
    })

    return reply.status(201).send({
      message: 'Order item created successfully'
    })
  }
}
