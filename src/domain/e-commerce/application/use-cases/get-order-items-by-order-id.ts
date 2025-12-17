import { Either, right } from "@/core/either"
import { OrderItem } from "../../enterprise/entities/order-item"
import { OrderItemRepository } from "../repositories/order-item-repository"

interface GetOrderItemsByOrderIdUseCaseRequest {
  orderId: string
}

type GetOrderItemsByOrderIdUseCaseResponse = Either<null, { items: OrderItem[] }>

export class GetOrderItemsByOrderIdUseCase {
  constructor(private orderItemRepository: OrderItemRepository) {}

  async execute({
    orderId,
  }: GetOrderItemsByOrderIdUseCaseRequest): Promise<GetOrderItemsByOrderIdUseCaseResponse> {
    const items = await this.orderItemRepository.findManyByOrderId(orderId)

    return right({ items })
  }
}
