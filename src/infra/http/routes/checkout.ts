import { FastifyTypedInstance } from '@/infra/types/provider'
import { CheckoutStripeController, type CheckoutRequestBody } from '../controllers.ts/checkout-stripe'
import { verifyJWT } from '../middleware/verify-jwt'
import { StripeWebhookController } from '../controllers.ts/stripe-webhook'

export async function checkoutRoutes(app: FastifyTypedInstance) {
  const checkoutStripeController = new CheckoutStripeController()
  const stripeWebhookController = new StripeWebhookController()
  
  app.addHook("onRequest", verifyJWT)

  app.post<{ Body: CheckoutRequestBody }>(
    "/",
    { onRequest: [verifyJWT] },
    async (req, reply) => checkoutStripeController.handle(req, reply)
  )


  app.post("/webhook/stripe", { config: { rawBody: true }},
    async (request, reply) => {
      return stripeWebhookController.handle(request, reply);
    }
  )
}


