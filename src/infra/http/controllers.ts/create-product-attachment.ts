import { FastifyRequest, FastifyReply } from 'fastify'
import { CreateProductAttachmentUseCase } from '@/domain/e-commerce/application/use-cases/create-product-attachment'
import { z } from 'zod'

export class CreateProductAttachmentController {
  constructor(
    private createProductAttachmentUseCase: CreateProductAttachmentUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const ProductAttachmentBodySchema = z.object({
      productId: z.string(),
      url: z.string()
    })

    const { productId, url } = ProductAttachmentBodySchema.parse(request.body)

    await this.createProductAttachmentUseCase.execute({
      productId,
      url
    })

    return reply.status(201).send({
      message: 'Product attachment created successfully'
    })
  }
}
