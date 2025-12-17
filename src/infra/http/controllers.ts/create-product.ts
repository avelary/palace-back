import { FastifyRequest, FastifyReply } from 'fastify'
import { CreateProductUseCase } from '@/domain/e-commerce/application/use-cases/create-product'
import { z } from 'zod'

export class CreateProductController {
  constructor(private createProductUseCase: CreateProductUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const ProductBodySchema = z.object({
      title: z.string(),
      description: z.string(),
      volume: z.string(),
      brand: z.string(),
      status: z.enum(['released', ' suspended', 'blocked']),
      gender: z.enum(['male', 'female', 'unisex']),
      price: z.number().positive(),
      marketPrice: z.number().positive(),
      costPrice: z.number().positive(),
      attachmentUrls: z.array(z.string())
    })

    const body = ProductBodySchema.parse(request.body)

    const result = await this.createProductUseCase.execute(body)

    if (result.isRight()) {
      const { product } = result.value
      return reply.status(201).send({
        message: 'Product created successfully',
        productId: product.id.toString(),
      })
    }

    return reply.status(500).send({ message: 'Erro ao criar o produto' })
  }
}
