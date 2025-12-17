import {  Either, right } from "@/core/either"
import { CartRepository } from "../repositories/cart-repository"
import { Cart } from "../../enterprise/entities/cart"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"


interface CreateCartUseCaseRequest {
  userId: string
  items?: string[]
}

type CreateCartUseCaseResponse = Either<null, {cart: Cart}>

export class CreateCartUseCase {
  constructor(private cartRepository: CartRepository) {}

  async execute({
    userId,
  }: CreateCartUseCaseRequest): Promise<CreateCartUseCaseResponse> {
    const cart = Cart.create({
      userId: new UniqueEntityID(userId),
    })

    await this.cartRepository.create(cart)

    return right({ cart })
  }
}
