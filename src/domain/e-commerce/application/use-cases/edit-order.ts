import { OrderRepository } from "../repositories/order-repository" 
import { left, right, Either } from "@/core/either"
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error"

interface EditOrderUseCaseRequest {
  orderId: string
  status: string
  address: string
}

type EditOrderUseCaseResponse = Either<ResourceNotFoundError, {}>

export class EditOrderUseCase {
  constructor(private OrderRepository: OrderRepository) {}

  async execute({
    orderId,
    status,
    address
  }: EditOrderUseCaseRequest): Promise<EditOrderUseCaseResponse> {
    const order = await this.OrderRepository.findById(orderId)

    if (!order) {
      return left(new ResourceNotFoundError())
    }

    order.status = status
    order.address = address

    await this.OrderRepository.edit(order)

    return right({})
  } 
}