import { FastifyRequest, FastifyReply } from 'fastify'
import { AuthenticateUseCase } from '@/domain/e-commerce/application/use-cases/authenticate'
import { z } from 'zod'
import { WrongCredentialsError } from '@/core/errors/errors/wrong-credentials-error'

export class AuthenticateController {
  constructor(
    private authenticateUseCase: AuthenticateUseCase,) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const LoginBodySchema = z.object({
      email: z.email('Invalid email'),
      password: z.string().min(6, ).trim(),
    })

    const body = LoginBodySchema.parse(request.body)

    const result = await this.authenticateUseCase.execute(body)

    if (result.isLeft()) {
    const error = result.value

    switch (error.constructor) {
      case WrongCredentialsError:
        throw Object.assign(new Error(error.message), { statusCode: 401 })

      default:
        throw Object.assign(new Error(error.message), { statusCode: 400 })
      }
    }

    const { accessToken } = result.value

    return reply.status(200).send({
      access_token: accessToken
    })
  }
}
