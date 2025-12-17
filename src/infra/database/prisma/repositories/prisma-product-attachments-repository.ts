import { ProductAttachmentsRepository } from "@/domain/e-commerce/application/repositories/product-attachments-repository"
import { ProductAttachment } from "@/domain/e-commerce/enterprise/entities/product-attachments"
import { PrismaProductAttachmentMapper } from "../mappers/prisma-product-attachments-mapper"
import { prisma } from "../../prisma"

export class PrismaProductAttachmentsRepository implements ProductAttachmentsRepository {

  async findManyByProductId(productId: string): Promise<ProductAttachment[]> {
    const attachments = await prisma.attachment.findMany({
      where: { productId },
    })

    return attachments.map(PrismaProductAttachmentMapper.toDomain)
  }

  async findById(id: string) {
    const attachment = await prisma.attachment.findUnique({ where: {id} })

    if (!attachment) {
      return null
    }

    return PrismaProductAttachmentMapper.toDomain(attachment)
  }

  async create(attachment: ProductAttachment) {
    const data = {
      id: attachment.id.toString(),
      productId: attachment.productId.toString(),
      url: attachment.url,
    }

    await prisma.attachment.create({ data })
  }

  async delete(attachment: ProductAttachment): Promise<void> {
    await prisma.attachment.delete({
      where: { id: attachment.id.toString() },
    })
  }
}
