import { Either, right } from "@/core/either"
import type { CartItem } from "../../enterprise/entities/cart-item"
import type { CartItemRepository } from "../repositories/cart-item-repository"

interface GetCartItemsByCartIdUseCaseRequest {
  cartId: string
}

type GetCartItemsByCartIdUseCaseResponse = Either<null, { items: CartItem[] }>

export class GetCartItemsByCartIdUseCase {
  constructor(private cartItemRepository: CartItemRepository) {}

  async execute({
    cartId,
  }: GetCartItemsByCartIdUseCaseRequest): Promise<GetCartItemsByCartIdUseCaseResponse> {
    const items = await this.cartItemRepository.findManyByCartId(cartId)

    return right({ items })
  }
}
