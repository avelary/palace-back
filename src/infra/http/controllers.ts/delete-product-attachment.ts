import { DeleteProductAttachmentUseCase } from '@/domain/e-commerce/application/use-cases/delete-product-attachment'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export class DeleteProductAttachmentController {
  constructor(private deleteProductAttachmentUseCase: DeleteProductAttachmentUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const ProductAttachmentBodySchema = z.object({
      id: z.string(),
    })

    const body = ProductAttachmentBodySchema.parse(request.body)

    await this.deleteProductAttachmentUseCase.execute(body)

    return reply.status(200).send({
      message: 'Attachment deleted successfully'
    })
  }
}
