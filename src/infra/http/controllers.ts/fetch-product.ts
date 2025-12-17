import { FastifyRequest, FastifyReply } from 'fastify'
import { FetchProductsUseCase } from '@/domain/e-commerce/application/use-cases/fetch-products'
import { z } from 'zod'

export class FetchProductController {
  constructor(private fetchProductsUseCase: FetchProductsUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const querySchema = z.object({
      page: z.coerce.number().min(1).default(1),
    })

    const { page } = querySchema.parse(request.query)

    const result = await this.fetchProductsUseCase.execute({ page })

    if (result.isLeft()) {
      return reply.status(400).send({ message: 'Failed to fetch products' })
    }

    const { products } = result.value

    return reply.status(200).send({
      products: products.map((p) => ({
        id: p.id.toString(),
        title: p.title,
        description: p.description,
        volume: p.volume,
        brand: p.brand,
        status: p.status,
        gender: p.gender,
        price: p.price,
        marketPrice: p.marketPrice,
        costPrice: p.costPrice,
        attachments: p.attachments,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
      })),
    })
  }
}
