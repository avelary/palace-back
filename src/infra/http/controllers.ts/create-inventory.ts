import { FastifyRequest, FastifyReply } from 'fastify'
import { CreateInventoryUseCase } from '@/domain/e-commerce/application/use-cases/create-inventory'
import { z } from 'zod'

export class CreateInventoryController {
  constructor(
    private createInventoryUseCase: CreateInventoryUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const InventoryBodySchema = z.object({
      productId: z.string(),
      quantityAvailable: z.number().positive(),
      warehouseLocation: z.string()
    })

    const body = InventoryBodySchema.parse(request.body)

    await this.createInventoryUseCase.execute(body)

    return reply.status(201).send({
      message: 'Inventory created successfully'
    })
  }
}
