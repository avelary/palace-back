import { InMemoryProductAttachmentsRepository } from "@/test/repositories/in-memory-product-attachments-repository"
import { DeleteProductAttachmentUseCase } from "./delete-product-attachment"
import { makeProductAttachment } from "@/test/factories/make-product-attachment"

describe('Delete Cart Item', () => {
  let inMemoryProductAttachmentRepository: InMemoryProductAttachmentsRepository
  let sut: DeleteProductAttachmentUseCase

  beforeEach(() => {
    inMemoryProductAttachmentRepository = new InMemoryProductAttachmentsRepository()
    sut = new DeleteProductAttachmentUseCase(inMemoryProductAttachmentRepository)
  })

  it('should be able to delete cart item', async () => {
    const newProductAttachment = makeProductAttachment()

    await inMemoryProductAttachmentRepository.create(newProductAttachment)

    const result = await sut.execute({
       id: newProductAttachment.id.toString()
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryProductAttachmentRepository.items).toHaveLength(0)
  })
})
