import { FastifyRequest, FastifyReply } from "fastify";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export interface CheckoutRequestBody {
  addressId: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
}

export class CheckoutStripeController {
  async handle(
    request: FastifyRequest<{ Body: CheckoutRequestBody }>,
    reply: FastifyReply
  ) {
    try {
      const { items, addressId } = request.body;

      if (!items || items.length === 0) {
        return reply.status(400).send({ error: "Carrinho vazio" });
      }

      const line_items = items.map((item) => ({
        price_data: {
          currency: "brl",
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      }));

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items,
        success_url: "http://localhost:3000/sucess",
        cancel_url: "http://localhost:3000",
        metadata: {
          addressId,
          userId: (request.user as any)?.sub,
          productIds: items.map((i) => i.id).join(","),
        },
        locale: "pt"
      });

      return reply.send({ url: session.url });
    } catch (err) {
      console.error("Erro ao criar checkout:", err);
      return reply.status(500).send({ error: "Erro ao criar checkout" });
    }
  }
}
