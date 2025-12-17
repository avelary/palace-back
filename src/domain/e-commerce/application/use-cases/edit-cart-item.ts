import { Either, left, right } from "@/core/either"
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error"
import { CartItemRepository } from "../repositories/cart-item-repository"
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error"

interface EditCartItemUseCaseRequest {
  cartId: string
  itemId: string
  quantity: number
}

type EditCartItemUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>

export class EditCartItemUseCase {
  constructor(private cartItemRepository: CartItemRepository) {}

  async execute({
    cartId,
    itemId,
    quantity
  }: EditCartItemUseCaseRequest): Promise<EditCartItemUseCaseResponse> {
    
    const cartItem = await this.cartItemRepository.findById(itemId)

    if (!cartItem) {
      return left(new ResourceNotFoundError())
    }

    if (cartItem.cartId.toString() !== cartId) {
      return left(new NotAllowedError())
    }

    cartItem.quantity = quantity

    await this.cartItemRepository.edit(cartItem)

    return right({})
  }
}
