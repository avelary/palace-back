import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Product } from "../../enterprise/entities/product"
import { ProductAttachment } from "../../enterprise/entities/product-attachments"
import { ProductRepository } from "../repositories/product-repository"
import { right, Either } from "@/core/either"
import { ProductAttachmentList } from "../../enterprise/entities/product-attachments-list"

interface CreateProductUseCaseRequest {
  title: string
  description: string
  volume: string
  brand: string
  status: string
  gender: string
  price: number
  marketPrice: number
  costPrice: number
  attachmentUrls: string[]
}

type CreateProductUseCaseResponse = Either<null, {product: Product}>

export class CreateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    title,
    description,
    volume,
    brand,
    status,
    gender,
    price,
    marketPrice,
    costPrice,
    attachmentUrls,
  }: CreateProductUseCaseRequest): Promise<CreateProductUseCaseResponse> {
    const product = Product.create({
      title,
      description,
      volume,
      brand,
      status,
      gender,
      price,
      marketPrice,
      costPrice
    })

    const productAttachments = attachmentUrls.map((attachmentUrl) => {
      return ProductAttachment.create({
        productId: new UniqueEntityID(product.id.toString()),
        url: attachmentUrl
      })
    })

    product.attachments = new ProductAttachmentList(productAttachments)

    await this.productRepository.create(product)

    return right({product})
  } 
}