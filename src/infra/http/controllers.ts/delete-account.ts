import { DeleteAccountUseCase } from '@/domain/e-commerce/application/use-cases/delete-account'
import { FastifyRequest, FastifyReply } from 'fastify'

export class DeleteAccountController {
  constructor(private deleteAccountUseCase: DeleteAccountUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    await request.jwtVerify()

    const userId = request.user.sub
    const authUserId = request.user.sub

    await this.deleteAccountUseCase.execute({authUserId, userId})

    return reply.status(200).send({
      message: 'Account deleted successfully'
    })
  }
}
