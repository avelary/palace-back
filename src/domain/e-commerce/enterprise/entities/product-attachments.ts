import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

export interface ProductAttachmentProps {
  productId: UniqueEntityID
  url: string
}

export class ProductAttachment extends Entity<ProductAttachmentProps> {
  get productId(){
    return this.props.productId
  }

  get url (){
    return this.props.url
  }

  set productId(productId: UniqueEntityID) {
    this.props.productId = productId
  }

  set url(url: string) {
    this.props.url = url
  }

  static create(props: ProductAttachmentProps, id?: UniqueEntityID) {
    const attachment = new ProductAttachment({...props}, id)
  
    return attachment
  }
}