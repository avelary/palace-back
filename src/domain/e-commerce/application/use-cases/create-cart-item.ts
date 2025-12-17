import { Either, left, right } from "@/core/either"
import { CartItemRepository } from "../repositories/cart-item-repository"
import { CartItem } from "../../enterprise/entities/cart-item"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { CartRepository } from "../repositories/cart-repository"
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error"

interface CreateCartItemUseCaseRequest {
  cartId: string
  productId: string
  quantity: number
}

type CreateCartItemUseCaseResponse = Either<ResourceNotFoundError, { item: CartItem }>

export class CreateCartItemUseCase {
  constructor(
    private cartItemRepository: CartItemRepository,
    private cartRepository: CartRepository
  ) {}

  async execute({
    cartId,
    productId,
    quantity,
  }: CreateCartItemUseCaseRequest): Promise<CreateCartItemUseCaseResponse> {

    const cart = await this.cartRepository.findById(cartId)

    if (!cart) {
      return left(new ResourceNotFoundError())
    }

    const existingItem = await this.cartItemRepository.findByCartIdAndProductId(
      cartId,
      productId
    )

    let item: CartItem

    if (existingItem) {
      existingItem.quantity += quantity
      await this.cartItemRepository.edit(existingItem)
      item = existingItem
    } else {
      item = CartItem.create({
        cartId: new UniqueEntityID(cartId),
        productId: new UniqueEntityID(productId),
        quantity,
      })

      await this.cartItemRepository.create(item)
    }

    return right({ item })
  }
}
