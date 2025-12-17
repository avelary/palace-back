import { InMemoryProductAttachmentsRepository } from "@/test/repositories/in-memory-product-attachments-repository"
import { GetProductAttachmentsByOrderIdUseCase } from "./get-product-attachments-by-product-id"
import { makeProductAttachment } from "@/test/factories/make-product-attachment"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

describe('Get Many Product Attachments By Product Id', () => {
  let inMemoryProductAttachmentsRepository: InMemoryProductAttachmentsRepository
  let sut: GetProductAttachmentsByOrderIdUseCase

  beforeEach(() => {
    inMemoryProductAttachmentsRepository = new InMemoryProductAttachmentsRepository()
    sut = new GetProductAttachmentsByOrderIdUseCase(inMemoryProductAttachmentsRepository)
  })

  it('should be able to get many product attachments by product id', async() => {
    inMemoryProductAttachmentsRepository.create(makeProductAttachment({productId: new UniqueEntityID('product-01')}))
    inMemoryProductAttachmentsRepository.create(makeProductAttachment({productId: new UniqueEntityID('product-01')}))
    inMemoryProductAttachmentsRepository.create(makeProductAttachment({productId: new UniqueEntityID('another-product')}))

    const result = await sut.execute({
      productId: 'product-01'
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.attachments).toHaveLength(2)
  })
})