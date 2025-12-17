import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Order } from "../../enterprise/entities/order"
import { OrderItem } from "../../enterprise/entities/order-item"
import { OrderItemsList } from "../../enterprise/entities/order-items-list"
import { OrderRepository } from "../repositories/order-repository"
import { right, Either } from "@/core/either"

interface CreateOrderUseCaseRequest {
  userId: string
  totalAmount: number
  address: string
  productIds: string[]
}

type CreateOrderUseCaseResponse = Either<null, { order: Order }>

export class CreateOrderUseCase {
  constructor(
    private ordersRepository: OrderRepository) {}

  async execute({
    userId,
    totalAmount,
    address,
    productIds,
  }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
    
    const emptyItemsList = new OrderItemsList([])

    const order = Order.create({
      userId: new UniqueEntityID(userId),
      totalAmount,
      status: 'pending',
      address,
      items: emptyItemsList,
    })

    const orderItems = productIds.map((productId) => {
      return OrderItem.create({
        orderId: order.id, // agora funciona
        productId: new UniqueEntityID(productId),
        quantity: 1,
      })
    })

    const itemsList = new OrderItemsList(orderItems)
    order.items = itemsList

    await this.ordersRepository.create(order)

    return right({ order })
  }
}