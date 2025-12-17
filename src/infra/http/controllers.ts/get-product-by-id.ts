import { FastifyRequest, FastifyReply } from 'fastify'
import { GetProductByIdUseCase } from '@/domain/e-commerce/application/use-cases/get-product-by-id'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import z from 'zod'

export class GetProductByIdController {
  constructor(private getProductByIdUseCase: GetProductByIdUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
      productId: z.string()
    })

    const { productId } = paramsSchema.parse(request.params)

    const result = await this.getProductByIdUseCase.execute({ productId })

    if (result.isLeft()) {
      const error = result.value

      if (error instanceof ResourceNotFoundError) {
        return reply.status(404).send({ message: 'Product not found.' })
      }

      return reply.status(500).send({ message: 'Internal server error' })
    }

    const { product } = result.value

    return reply.status(200).send({
      product: {
        id: product.id.toString(),
        title: product.title,
        description: product.description,
        volume: product.volume,
        brand: product.brand,
        status: product.status,
        gender: product.gender,
        price: product.price,
        marketPrice: product.marketPrice,
        costPrice: product.costPrice,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
      },
    })
  }
}
