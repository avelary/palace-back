import { FastifyRequest, FastifyReply } from "fastify";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export class StripeWebhookController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const sig = request.headers["stripe-signature"] as string;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    let event: Stripe.Event;

    try {
      if (!request.rawBody) {
        return reply.status(400).send({ error: "Missing rawBody" })
      }

      const raw = request.rawBody.toString()

      event = stripe.webhooks.constructEvent(
        raw,
        sig,
        webhookSecret
      );

    } catch (err) {
      console.error("❌ Webhook signature verification failed.", err);
      return reply.status(400).send({ error: "Invalid signature" });
    }

    // Identifica evento
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded": {
        const session = event.data.object as Stripe.Checkout.Session;

        console.log("🔥 Checkout finalizado!", session);

        // Aqui você irá:
        // - Criar Order
        // - Criar OrderItems
        // - Criar Payment
        // - Salvar endereço
        // - etc.

        break;
      }

      default:
        console.log(`Evento ignorado: ${event.type}`);
    }

    return reply.status(200).send({ received: true });
  }
}
