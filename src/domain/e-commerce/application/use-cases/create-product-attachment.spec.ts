import { InMemoryProductAttachmentsRepository } from "@/test/repositories/in-memory-product-attachments-repository"
import { CreateProductAttachmentUseCase } from "./create-product-attachment"

describe('Create ProductAttachment', () => {
  let inMemoryProductAttachmentRepository: InMemoryProductAttachmentsRepository
  let sut: CreateProductAttachmentUseCase

  beforeEach(() => {
    inMemoryProductAttachmentRepository = new InMemoryProductAttachmentsRepository()
    sut = new CreateProductAttachmentUseCase(inMemoryProductAttachmentRepository)
  })

  it('should be able create a new inventory', async() => {
    const result = await sut.execute({
      productId: 'product-01',
      url: 'url.com'
    })
    
    expect(result.isRight()).toBe(true)
    expect(inMemoryProductAttachmentRepository.items[0]?.productId.toString()).toEqual('product-01')
  })
})