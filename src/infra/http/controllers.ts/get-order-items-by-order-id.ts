import { FastifyRequest, FastifyReply } from 'fastify'
import { GetOrderItemsByOrderIdUseCase } from '@/domain/e-commerce/application/use-cases/get-order-items-by-order-id'
import z from 'zod'

export class GetOrderItemsByOrderIdController {
  constructor(private getOrderItemsByOrderIdUseCase: GetOrderItemsByOrderIdUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const GetItemsQuerySchema = z.object({
      orderId: z.string()
    })
    
    const query = GetItemsQuerySchema.parse(request.query)
    
    
    const result = await this.getOrderItemsByOrderIdUseCase.execute(query)

    if (result.isLeft()) {
      return reply.status(400).send({ message: 'Failed to get order items' })
    }

    const { items } = result.value

    return reply.status(200).send({
      items: items.map((p) => ({
        id: p.id.toString(),
        productId: p.productId.toString(),
        quantity: p.quantity,
        createdAt: p.createdAt
      })),
    })
  }
}
