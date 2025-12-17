import { InMemoryProductsRepository } from "@/test/repositories/in-memory-products-repository"
import { GetProductByIdUseCase } from "./get-product-by-id"
import { makeProduct } from "@/test/factories/make-product"

describe('Get Product By Id', () => {
  let inMemoryProductsRepository: InMemoryProductsRepository
  let sut: GetProductByIdUseCase

  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository()
    sut = new GetProductByIdUseCase(inMemoryProductsRepository)
  })

  it('should be able to get product by id', async () => {
    const newProduct = makeProduct()
    
    await inMemoryProductsRepository.create(newProduct)

    const result = await sut.execute({ productId: newProduct.id.toString()})

    expect(result.isRight()).toBe(true)
  })
})
