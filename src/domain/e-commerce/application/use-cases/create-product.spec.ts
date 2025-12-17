import { InMemoryProductsRepository } from "@/test/repositories/in-memory-products-repository"
import { CreateProductUseCase } from "./create-product"

describe('Create Product', () => {
  let inMemoryProductsRepository: InMemoryProductsRepository
  let sut: CreateProductUseCase

  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository()
    sut = new CreateProductUseCase(inMemoryProductsRepository)
  })

  it('should be able create a new product', async() => {
    const result = await sut.execute({
      title: 'New Product',
      description: 'New product description',
      volume: '200ML',
      brand: 'Exemplo brand',
      status: 'released',
      gender: 'femenino',
      price: 139.90,
      marketPrice: 199.90,
      costPrice: 79.90,
      attachmentUrls: ['1', '2']
    })
    
    expect(result.isRight()).toBe(true)
    expect(inMemoryProductsRepository.items[0]).toEqual(result.value?.product)
  })
})