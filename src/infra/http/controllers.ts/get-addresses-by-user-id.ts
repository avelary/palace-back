import { FastifyRequest, FastifyReply } from 'fastify'
import { GetAddressesByUserIdUseCase } from '@/domain/e-commerce/application/use-cases/get-addresses-by-user-id'

export class GetAddressesByUserIdController {
  constructor(private getAddressesByUserIdUseCase: GetAddressesByUserIdUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.sub
    
    const result = await this.getAddressesByUserIdUseCase.execute({ userId })

    if (result.isLeft()) {
      return reply.status(400).send({ message: 'Failed to get addresses' })
    }

    const { addresses } = result.value

    return reply.status(200).send({
      addresses: addresses.map((p) => ({
        id: p.id.toString(),
        name: p.name,
        street: p.street,
        number: p.number,
        additionalInfo: p.additionalInfo,
        city: p.city,
        state: p.state,
        zipCode: p.zipCode,
        country: p.country
      })),
    })
  }
}
