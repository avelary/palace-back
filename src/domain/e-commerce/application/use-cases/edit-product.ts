import { ProductRepository } from "../repositories/product-repository"
import { left, right, Either } from "@/core/either"
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error"

interface EditProductUseCaseRequest {
  productId: string
  title: string
  description: string
  volume: string
  status: string
  price: number
  marketPrice: number,
  costPrice: number
}

type EditProductUseCaseResponse = Either<ResourceNotFoundError, {}>

export class EditProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    productId,
    title,
    description,
    volume,
    status,
    price,
    marketPrice,
    costPrice
  }: EditProductUseCaseRequest): Promise<EditProductUseCaseResponse> {
    const product = await this.productRepository.findById(productId)

    if (!product) {
      return left(new ResourceNotFoundError())
    }

    product.title = title
    product.description = description
    product.volume = volume
    product.status = status
    product.price = price
    product.marketPrice = marketPrice,
    product.costPrice = costPrice

    await this.productRepository.edit(product)

    return right({})
  } 
}