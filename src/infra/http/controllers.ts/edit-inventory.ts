import { FastifyRequest, FastifyReply } from 'fastify'
import { EditInventoryUseCase } from '@/domain/e-commerce/application/use-cases/edit-inventory'
import { z } from 'zod'

export class EditInventoryController {
  constructor(
    private createInventoryUseCase: EditInventoryUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const InventoryBodySchema = z.object({
      inventoryId: z.string(),
      quantityAvailable: z.number().positive(),
      warehouseLocation: z.string()
    })

    const body = InventoryBodySchema.parse(request.body)

    await this.createInventoryUseCase.execute(body)

    return reply.status(200).send({
      message: 'Inventory updated successfully'
    })
  }
}
