import { CreateCartUseCase } from "./create-cart"
import { InMemoryCartRepository } from "@/test/repositories/in-memory-cart-repository"

describe("Create cart", () => {
  let inMemoryCartRepository: InMemoryCartRepository
  let sut: CreateCartUseCase

  beforeEach(() => {
    inMemoryCartRepository = new InMemoryCartRepository()
    sut = new CreateCartUseCase(inMemoryCartRepository)
  })

  it("should be able to create a new cart", async () => {
    const result = await sut.execute({
      userId: "user-01",
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryCartRepository.items).toHaveLength(1)
  })
})
