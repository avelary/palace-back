import { right, Either } from "@/core/either"
import { Order } from "../../enterprise/entities/order"
import { OrderRepository } from "../repositories/order-repository"

interface FetchOrderUseCaseRequest {
  page: number
}

type FetchOrderUseCaseResponse = Either<null, {order: Order[]}>

export class FetchOrdersUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute({
    page
  }: FetchOrderUseCaseRequest): Promise<FetchOrderUseCaseResponse> {
    const order = await this.orderRepository.findMany({page})

    return right({ order })
  } 
}