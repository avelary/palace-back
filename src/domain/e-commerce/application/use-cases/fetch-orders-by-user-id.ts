import { right, Either } from "@/core/either"
import { Order } from "../../enterprise/entities/order"
import { OrderRepository } from "../repositories/order-repository"

interface FetchOrderByUserIdUseCaseRequest {
  userId: string
}

type FetchOrderByUserIdUseCaseResponse = Either<null, {orders: Order[]}>

export class FetchOrdersByUserIdUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute({
    userId
  }: FetchOrderByUserIdUseCaseRequest): Promise<FetchOrderByUserIdUseCaseResponse> {
    const orders = await this.orderRepository.findManyByUserId(userId)

    return right({ orders })
  } 
}