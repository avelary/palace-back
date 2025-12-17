import { ProductAttachment } from "../../enterprise/entities/product-attachments"

export interface ProductAttachmentsRepository {
  findManyByProductId(id: string): Promise<ProductAttachment[]>
  findById(id: string): Promise<ProductAttachment | null>
  create(attachment: ProductAttachment): Promise<void>
  delete(attachment: ProductAttachment): Promise<void>
}