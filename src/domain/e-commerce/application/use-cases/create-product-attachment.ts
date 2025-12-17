import { Either, right } from '@/core/either'
import { ProductAttachmentsRepository } from '../repositories/product-attachments-repository'
import { ProductAttachment } from '../../enterprise/entities/product-attachments'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface CreateProductAttachmentUseCaseRequest {
  productId: string
  url: string
}

type CreateProductAttachmentUseCaseResponse = Either<null, { attachment: ProductAttachment }>

export class CreateProductAttachmentUseCase {
  constructor(private attachmentRepository: ProductAttachmentsRepository) {}

  async execute({
    productId,
    url
  }: CreateProductAttachmentUseCaseRequest): Promise<CreateProductAttachmentUseCaseResponse> {
    const attachment = ProductAttachment.create({
      productId: new UniqueEntityID(productId),
      url
    })

    await this.attachmentRepository.create(attachment)

    return right({ attachment })
  }
}
