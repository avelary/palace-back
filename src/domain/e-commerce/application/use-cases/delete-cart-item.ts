import { left, right, Either } from "@/core/either"
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error"
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error"
import { CartItemRepository } from "../repositories/cart-item-repository"

interface DeleteproductUseCaseRequest {
  cartId: string
  itemId: string
}

type DeleteCartItemUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>

export class DeleteCartItemUseCase {
  constructor(private cartItemRepository: CartItemRepository) {}

  async execute({
    itemId,
    cartId
  }: DeleteproductUseCaseRequest): Promise<DeleteCartItemUseCaseResponse> {
    const item = await this.cartItemRepository.findById(itemId)

    if (!item) {
      return left(new ResourceNotFoundError())
    }

    if(item.cartId.toString() !== cartId) {
      return left(new NotAllowedError())
    }

    await this.cartItemRepository.delete(item)

    return right({})
  }
}
