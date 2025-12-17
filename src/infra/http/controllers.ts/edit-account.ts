import { FastifyRequest, FastifyReply } from 'fastify'
import { EditAccountUseCase } from '@/domain/e-commerce/application/use-cases/edit-user'
import { z } from 'zod'

export class EditAccountController {
  constructor(private editAccountUseCase: EditAccountUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    await request.jwtVerify()

    const AccountBodySchema = z.object({
      name: z.string().min(1, ''),
      gender: z.enum(['male', 'female', 'unisex']),
      image: z.string().trim(),
    })

    const { name, gender, image } = AccountBodySchema.parse(request.body)

    const userId = request.user.sub
    const authUserId = request.user.sub

    await this.editAccountUseCase.execute({
      userId,
      authUserId,
      name,
      gender,
      image,
    })

    return reply.status(200).send({
      message: 'Account updated successfully',
    })
  }
}
