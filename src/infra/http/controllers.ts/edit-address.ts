import { FastifyRequest, FastifyReply } from 'fastify'
import { EditAddressUseCase } from '@/domain/e-commerce/application/use-cases/edit-address'
import { z } from 'zod'

export class EditAddressController {
  constructor(
    private editAddressUseCase: EditAddressUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const AddressBodySchema = z.object({
      addressId: z.string(),
      name: z.string(),
      street: z.string(),
      number: z.string(),
      additionalInfo: z.string(),
      city: z.string(),
      state: z.string(),
      zipCode:z.string(),
      country: z.string()
    })

    const { addressId , name, street, number, additionalInfo, city, state, zipCode, country } = AddressBodySchema.parse(request.body)
    const userId = request.user.sub

    await this.editAddressUseCase.execute({
      userId,
      addressId,
      name,
      street,
      number,
      additionalInfo,
      city,
      state,
      zipCode,
      country
    })

    return reply.status(200).send({
      message: 'Address updated successfully'
    })
  }
}
