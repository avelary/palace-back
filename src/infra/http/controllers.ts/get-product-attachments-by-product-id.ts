import { FastifyRequest, FastifyReply } from 'fastify'
import { GetProductAttachmentsByOrderIdUseCase } from '@/domain/e-commerce/application/use-cases/get-product-attachments-by-product-id'
import { z } from 'zod'

export class GetProductAttachmentByProductIdController {
  constructor(private getProductAttachmentsByProductIdUseCase: GetProductAttachmentsByOrderIdUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const GetAttachmentsQuerySchema = z.object({
      productId: z.string()
    })

   const query = GetAttachmentsQuerySchema.parse(request.query)
    
    const result = await this.getProductAttachmentsByProductIdUseCase.execute(query)

    if (result.isLeft()) {
      return reply.status(400).send({ message: 'Failed to get order items' })
    }

    const { attachments } = result.value

    return reply.status(200).send({
      attachments: attachments.map((p) => ({
        id: p.id.toString(),
        url: p.url,
      })),
    })
  }
}
