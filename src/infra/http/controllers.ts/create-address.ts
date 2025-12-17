import { FastifyRequest, FastifyReply } from 'fastify'
import { CreateAddressUseCase } from '@/domain/e-commerce/application/use-cases/create-address'
import { z } from 'zod'

export class CreateAddressController {
  constructor(
    private createAddressUseCase: CreateAddressUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const AddressBodySchema = z.object({
      name: z.string(),
      street: z.string(),
      number: z.string(),
      additionalInfo: z.string(),
      city: z.string(),
      state: z.string(),
      zipCode:z.string(),
      country: z.string()
    })

    const { name, street, number, additionalInfo, city, state, zipCode, country } = AddressBodySchema.parse(request.body)
    const userId = request.user.sub

    await this.createAddressUseCase.execute({
      userId,
      name,
      street,
      number,
      additionalInfo,
      city,
      state,
      zipCode,
      country
    })

    return reply.status(201).send({
      message: 'Address created successfully'
    })
  }
}
