import { FastifyRequest, FastifyReply } from 'fastify'
import { EditPaymentUseCase } from '@/domain/e-commerce/application/use-cases/edit-payment'
import { z } from 'zod'

export class EditPaymentController {
  constructor(
    private editPaymentUseCase: EditPaymentUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const PaymentBodySchema = z.object({
      paymentId: z.string(),
      amount: z.number(),
      status: z.enum(['pending', 'cancel', 'completed']),
      paymentMethod: z.enum(['credit_card', 'pix', 'boleto', 'paypal']),
    })

    const body = PaymentBodySchema.parse(request.body)

    await this.editPaymentUseCase.execute(body)

    return reply.status(200).send({
      message: 'Payment updated successfully'
    })
  }
}
