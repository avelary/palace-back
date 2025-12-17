import { Either, right } from "@/core/either"
import { ProductAttachment } from "../../enterprise/entities/product-attachments"
import { ProductAttachmentsRepository } from "../repositories/product-attachments-repository"

interface GetProductAttachmentsByOrderIdUseCaseRequest {
  productId: string
}

type GetProductAttachmentsByOrderIdUseCaseResponse = Either<null, { attachments: ProductAttachment[] }>

export class GetProductAttachmentsByOrderIdUseCase {
  constructor(private productAttachmentRepository: ProductAttachmentsRepository) {}

  async execute({
    productId,
  }: GetProductAttachmentsByOrderIdUseCaseRequest): Promise<GetProductAttachmentsByOrderIdUseCaseResponse> {
    const attachments = await this.productAttachmentRepository.findManyByProductId(productId)

    return right({ attachments })
  }
}
