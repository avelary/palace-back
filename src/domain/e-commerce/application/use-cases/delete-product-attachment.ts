import { left, right, Either } from "@/core/either"
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error"
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error"
import { ProductAttachmentsRepository } from "../repositories/product-attachments-repository"

interface DeleteproductUseCaseRequest {
  id: string
}

type DeleteProductAttachmentUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>

export class DeleteProductAttachmentUseCase {
  constructor(private productAttachmentRepository: ProductAttachmentsRepository) {}

  async execute({
    id
  }: DeleteproductUseCaseRequest): Promise<DeleteProductAttachmentUseCaseResponse> {
    const attachment = await this.productAttachmentRepository.findById(id)

    if (!attachment) {
      return left(new ResourceNotFoundError())
    }

    await this.productAttachmentRepository.delete(attachment)

    return right({})
  }
}
