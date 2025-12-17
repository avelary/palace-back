import { DeleteInventoryUseCase } from '@/domain/e-commerce/application/use-cases/delete-inventory'
import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'

export class DeleteInventoryController {
  constructor(private deleteInventoryUseCase: DeleteInventoryUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const InventoryBodySchema = z.object({
      inventoryId: z.string()
    })

    const body = InventoryBodySchema.parse(request.body)

    await this.deleteInventoryUseCase.execute(body)

    return reply.status(200).send({
      message: 'Inventory deleted successfully'
    })
  }
}
