import { DeleteProductUseCase } from '@/domain/e-commerce/application/use-cases/delete-product'
import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'

export class DeleteProductController {
  constructor(private deleteProductUseCase: DeleteProductUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const ProductBodySchema = z.object({
      productId: z.string()
    })

    const body = ProductBodySchema.parse(request.params)

    await this.deleteProductUseCase.execute(body)

    return reply.status(200).send({
      message: 'Product deleted successfully'
    })
  }
}
