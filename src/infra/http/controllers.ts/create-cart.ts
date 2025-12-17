import { FastifyRequest, FastifyReply } from "fastify"
import { CreateCartUseCase } from "@/domain/e-commerce/application/use-cases/create-cart"
import { CartRepository } from "@/domain/e-commerce/application/repositories/cart-repository"

export class CreateCartController {
  constructor(
    private createCartUseCase: CreateCartUseCase,
    private cartRepository: CartRepository
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.sub

    // 1️⃣ Verifica se já existe carrinho
    const existingCart = await this.cartRepository.findByUserId(userId)

    if (existingCart) {
      return reply.status(200).send({
        message: "Cart already exists",
        cart: existingCart,
      })
    }

    // 2️⃣ Cria um novo carrinho
    const result = await this.createCartUseCase.execute({ userId })

    if (result.isLeft()) {
      return reply.status(400).send({
        message: "Could not create cart",
      })
    }

    return reply.status(201).send({
      message: "Cart created successfully",
      cart: result.value.cart,
    })
  }
}
