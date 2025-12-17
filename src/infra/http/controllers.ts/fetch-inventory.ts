import { FastifyRequest, FastifyReply } from 'fastify'
import { FetchInventoryUseCase } from '@/domain/e-commerce/application/use-cases/fetch-inventory'
import { z } from 'zod'

export class FetchInventoryController {
  constructor(private fetchInventoryUseCase: FetchInventoryUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const querySchema = z.object({
      page: z.coerce.number().min(1).default(1),
    })

    const { page } = querySchema.parse(request.query)

    const result = await this.fetchInventoryUseCase.execute({ page })

    if (result.isLeft()) {
      return reply.status(400).send({ message: 'Failed to fetch inventory' })
    }

    const { inventory } = result.value

    return reply.status(200).send({
      inventory: inventory.map((p) => ({
        id: p.id.toString(),
        productId: p.productId,
        quantityAvailable: p.quantityAvailable,
        warehouseLocation: p.warehouseLocation,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt
      })),
    })
  }
}
