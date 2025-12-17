import { Either, right  } from "@/core/either"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { OrderItem } from "../../enterprise/entities/order-item"
import type { OrderItemRepository } from "../repositories/order-item-repository"

interface CreateOrderItemUseCaseRequest {
  orderId: string
  productId: string
  quantity: number
}

type CreateOrderItemUseCaseResponse = Either<null, {item: OrderItem}>

export class CreateOrderItemUseCase {
  constructor(private orderItemRepository: OrderItemRepository) {}

  async execute({
    orderId,
    productId,
    quantity,
  }: CreateOrderItemUseCaseRequest): Promise<CreateOrderItemUseCaseResponse> {
    const item = OrderItem.create({
      orderId: new UniqueEntityID(orderId),
      productId: new UniqueEntityID(productId),
      quantity,
    })

    await this.orderItemRepository.create(item)

    return right({ item })
  } 
}