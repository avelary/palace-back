import { FastifyRequest, FastifyReply } from "fastify"
import { RefreshTokenUseCase } from "@/domain/e-commerce/application/use-cases/refresh-token"

export class RefreshTokenController {
  constructor(private refreshTokenUseCase: RefreshTokenUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user?.sub
    if (!userId) {
      throw Object.assign(new Error("Unauthorized"), { statusCode: 401 })
    }

    try {
      const result = await this.refreshTokenUseCase.execute(userId)
      return reply.status(200).send({
        access_token: result.accessToken,
        user: result.user,
      })
    } catch (err: any) {
      return reply
        .status(err.statusCode || 400)
        .send({ message: err.message || "Erro ao renovar token" })
    }
  }
}
