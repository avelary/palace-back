import { InMemoryProductsRepository } from "@/test/repositories/in-memory-products-repository"
import { makeProduct } from "@/test/factories/make-product"
import { FetchProductsUseCase } from "./fetch-products"

describe('Fetch Product', () => {
  let inMemoryProductsRepository: InMemoryProductsRepository
  let sut: FetchProductsUseCase

  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository()
    sut = new FetchProductsUseCase(inMemoryProductsRepository)
  })

  it('should be able to fetch products', async() => {
    inMemoryProductsRepository.create(makeProduct())
    inMemoryProductsRepository.create(makeProduct())
    inMemoryProductsRepository.create(makeProduct())
    
    const result = await sut.execute({
      page: 1
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.products).toHaveLength(3)
  })
})