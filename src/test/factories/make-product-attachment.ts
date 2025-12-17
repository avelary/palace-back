import { faker } from "@faker-js/faker"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { ProductAttachment, ProductAttachmentProps } from "@/domain/e-commerce/enterprise/entities/product-attachments"


export function makeProductAttachment(override: Partial<ProductAttachmentProps> = {}, id?: UniqueEntityID) {
  const attachment =  ProductAttachment.create({
    productId: new UniqueEntityID(),
    url: faker.internet.url.toString(),
    ...override
  }, id);

  return attachment
}