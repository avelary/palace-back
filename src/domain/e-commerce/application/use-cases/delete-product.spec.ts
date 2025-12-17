import { InMemoryProductsRepository } from "@/test/repositories/in-memory-products-repository"
import { DeleteProductUseCase } from "./delete-product"
import { makeProduct } from "@/test/factories/make-product"

describe('Delete Product', () => {
  let inMemoryProductsRepository: InMemoryProductsRepository
  let sut: DeleteProductUseCase

  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository()
    sut = new DeleteProductUseCase(inMemoryProductsRepository)
  })

  it('should be able to delete a product', async() => {
    const newProduct = makeProduct()

    inMemoryProductsRepository.create(newProduct)
    
    await sut.execute({
      productId: newProduct.id.toString()
    })

    expect(inMemoryProductsRepository.items).toHaveLength(0)
  })
})