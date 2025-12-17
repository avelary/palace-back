import { FastifyRequest, FastifyReply } from 'fastify'
import { CreateAccountUseCase } from '@/domain/e-commerce/application/use-cases/create-account'
import { z } from 'zod'

export class CreateAccountController {
  constructor(
    private createAccountUseCase: CreateAccountUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const AccountBodySchema = z.object({
      name: z.string().min(1, ''),
      email: z.email('Invalid email'),
      password: z.string().min(6, ).trim(),
      gender: z.enum(['male', 'female', 'unisex']),
      image: z.string().trim(),
    })

    const body = AccountBodySchema.parse(request.body)

    await this.createAccountUseCase.execute(body)

    return reply.status(201).send({
      message: 'Account created successfully'
    })
  }
}
