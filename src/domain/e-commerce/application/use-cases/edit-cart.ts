import { Either, left, right } from "@/core/either"
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error"
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error"
import { Cart } from "../../enterprise/entities/cart"
import { CartRepository } from "../repositories/cart-repository"
import { CartItemRepository } from "../repositories/cart-item-repository"
import { CartItemsList } from "../../enterprise/entities/cart-items-list" 
import { CartItem } from "../../enterprise/entities/cart-item"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

interface EditCartUseCaseRequest {
  userId: string
  productIds: string[]
}

type EditCartUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, { cart: Cart }>

export class EditCartUseCase {
  constructor(
    private cartRepository: CartRepository,
    private cartItemRepository: CartItemRepository
  ) {}

  async execute({
    userId,
    productIds,
  }: EditCartUseCaseRequest): Promise<EditCartUseCaseResponse> {
    const cart = await this.cartRepository.findByUserId(userId)

    if (!cart) {
      return left(new ResourceNotFoundError())
    }

    if (userId !== cart.userId.toString()) {
      return left(new NotAllowedError())
    }

    const currentCartItems = await this.cartItemRepository.findManyByCartId(cart.id.toString())
    const cartItemsList = new CartItemsList(currentCartItems)

    const cartItems = productIds.map((productId) => {
      return CartItem.create({
        cartId: new UniqueEntityID(cart.id.toString()),
        productId: new UniqueEntityID(productId),
        quantity: 1,
      })
    })

    cartItemsList.update(cartItems)
    cart.items = cartItemsList

    await this.cartRepository.edit(cart)

    return right({ cart })
  }
}
