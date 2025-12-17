import { FastifyRequest, FastifyReply } from 'fastify'
import { EditOrderUseCase } from '@/domain/e-commerce/application/use-cases/edit-order'
import { z } from 'zod'

export class EditOrderController {
  constructor(
    private createOrderUseCase: EditOrderUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const OrderBodySchema = z.object({
      orderId: z.string(),
      status: z.enum(['pending', 'paid', 'shipped', 'delivered', 'canceled']),
      address: z.string()
    })

    const body = OrderBodySchema.parse(request.body)

    const result = await this.createOrderUseCase.execute(body)

    if (result.isLeft()) {
      return reply.status(404).send({message: 'Order not found'})
    }

    return reply.status(200).send({
      message: 'Order updated successfully'
    })
  }
}
