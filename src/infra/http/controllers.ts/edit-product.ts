import { FastifyRequest, FastifyReply } from 'fastify'
import { EditProductUseCase } from '@/domain/e-commerce/application/use-cases/edit-product'
import { z } from 'zod'

export class EditProductController {
  constructor(private editProductUseCase: EditProductUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const ProductBodySchema = z.object({
      productId: z.string(),
      title: z.string(),
      description: z.string(),
      volume: z.string(),
      status: z.enum(['released', 'suspended', 'blocked']),
      price: z.number().positive(),
      marketPrice: z.number().positive(),
      costPrice: z.number().positive()
    })

    const body = ProductBodySchema.parse(request.body)

    await this.editProductUseCase.execute(body)

    return reply.status(200).send({
      message: 'Product updated successfully'
    })
  }
}
