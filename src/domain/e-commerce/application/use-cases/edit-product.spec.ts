import { InMemoryProductsRepository } from "@/test/repositories/in-memory-products-repository"
import { makeProduct } from "@/test/factories/make-product"
import { EditProductUseCase } from "./edit-product"

describe('Edit Product', () => {
  let inMemoryProductsRepository: InMemoryProductsRepository
  let sut: EditProductUseCase

  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository()
    sut = new EditProductUseCase(inMemoryProductsRepository)
  })

  it('should be able to edit a product', async() => {
    const newProduct = makeProduct()

    inMemoryProductsRepository.create(newProduct)
    
    const result = await sut.execute({
      productId: newProduct.id.toString(),
      title: 'New Title',
      description: 'New description',
      volume: '300ml',
      status: 'blocked',
      price: 139.90,
      marketPrice: 199.90,
      costPrice: 70.90
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryProductsRepository.items[0]).toMatchObject({
      title: 'New Title',
      description: 'New description',
      volume: '300ml',
      status: 'blocked',
      price: 139.90,
      marketPrice: 199.90,
      costPrice: 70.90
    })
  })
})