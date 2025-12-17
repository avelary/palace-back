import { Either, left, right } from "@/core/either"
import { Product } from "../../enterprise/entities/product"
import { ProductRepository } from "../repositories/product-repository"
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error"

interface GetProductByIdUseCaseRequest {
  productId: string
}

type GetProductByIdUseCaseResponse = Either<ResourceNotFoundError, { product: Product }>

export class GetProductByIdUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    productId,
  }: GetProductByIdUseCaseRequest): Promise<GetProductByIdUseCaseResponse> {
    const product = await this.productRepository.findById(productId)

    if(!product) {
      return left(new ResourceNotFoundError())
    }

    return right({ product })
  }
}
