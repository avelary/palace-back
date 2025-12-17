import { FastifyRequest, FastifyReply } from 'fastify'
import { CreatePaymentUseCase } from '@/domain/e-commerce/application/use-cases/create-payment'
import { z } from 'zod'

export class CreatePaymentController {
  constructor(
    private createPaymentUseCase: CreatePaymentUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const PaymentBodySchema = z.object({
      orderId: z.string(),
      amount: z.number(),
      paymentMethod: z.string(),
      transactionId: z.string()
    })

    const body = PaymentBodySchema.parse(request.body)

    await this.createPaymentUseCase.execute(body)

    return reply.status(201).send({
      message: 'Payment created successfully'
    })
  }
}
