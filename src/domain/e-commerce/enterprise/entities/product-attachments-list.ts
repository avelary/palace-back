import { WatchedList } from "@/core/entities/watched-list"
import { ProductAttachment } from "./product-attachments" 

export class ProductAttachmentList extends WatchedList<ProductAttachment> {
  compareItems(a: ProductAttachment, b: ProductAttachment): boolean {
    return a.productId.equals(b.productId)
  }
}