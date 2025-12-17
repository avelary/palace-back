import { ProductAttachmentsRepository } from "@/domain/e-commerce/application/repositories/product-attachments-repository"
import { ProductAttachment } from "@/domain/e-commerce/enterprise/entities/product-attachments"

export class InMemoryProductAttachmentsRepository implements ProductAttachmentsRepository {
  
  public items: ProductAttachment[] = []

  async findManyByProductId(id: string) {
    const productAttachment = this.items.filter(item => item.productId.toString() === id)
    return productAttachment
  }

  async findById(id: string) {
    const attachment = this.items.find(item => item.id.toString() === id)
  
    if (!attachment) {
      return null
    }

    return attachment
  }

  async create(attachment: ProductAttachment) {
    this.items.push(attachment)
  }

  async delete(attachment: ProductAttachment) {
    const itemIndex = this.items.findIndex(item => item.id.equals(attachment.id))
    this.items.splice(itemIndex, 1)
  }
}
