import { Attachment as PrismaAttachment } from '@prisma/client'
import { ProductAttachment } from '@/domain/e-commerce/enterprise/entities/product-attachments'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'


export class PrismaProductAttachmentMapper {
  static toDomain(raw: PrismaAttachment): ProductAttachment {
    if (!raw.productId) {
      throw new Error('invalid attachment type')
    }

    return ProductAttachment.create({
      productId: new UniqueEntityID(raw.productId),
      url: raw.url
    }, new UniqueEntityID(raw.id))
  }
}