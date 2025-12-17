import { ProductRepository } from "../repositories/product-repository"
import { right, Either } from "@/core/either"
import type { Product } from "../../enterprise/entities/product"

interface FetchProductsUseCaseRequest {
  page: number
}

type FetchProductsUseCaseResponse = Either<null, {products: Product[]}>

export class FetchProductsUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    page
  }: FetchProductsUseCaseRequest): Promise<FetchProductsUseCaseResponse> {
    const products = await this.productRepository.findMany({page})

    return right({ products })
  } 
}