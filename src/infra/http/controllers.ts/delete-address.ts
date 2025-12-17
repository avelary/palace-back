import { DeleteAddressUseCase } from '@/domain/e-commerce/application/use-cases/delete-address'
import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'

export class DeleteAddressController {
  constructor(private deleteAddressUseCase: DeleteAddressUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const AddressBodySchema = z.object({ 
      addressId: z.string()
    })

    const { addressId } = AddressBodySchema.parse(request.body)
    const userId = request.user.sub
    
    await this.deleteAddressUseCase.execute({addressId, userId})

    return reply.status(200).send({
      message: 'Address deleted successfully'
    })
  }
}
