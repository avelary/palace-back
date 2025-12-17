import { FastifyTypedInstance } from "@/infra/types/provider"
import { CreateWishlistItemUseCase } from "@/domain/e-commerce/application/use-cases/create-wishlist-item"
import { PrismaWishlistRepository } from "@/infra/database/prisma/repositories/prisma-wishlist-repository"
import { CreateWishlistItemController } from "../controllers.ts/create-wishlist"
import { DeleteWishlistItemUseCase } from "@/domain/e-commerce/application/use-cases/delete-wishlist-item"
import { DeleteWishlistItemController } from "../controllers.ts/delete-wishlist"
import { GetWishlistItemByUserIdController } from "../controllers.ts/get-wishlist-by-user-id"
import { GetWishlistItemsByUserIdUseCase } from "@/domain/e-commerce/application/use-cases/get-wishlist-by-user-id"
import { verifyJWT } from "../middleware/verify-jwt"

export async function wishlistRoutes(app: FastifyTypedInstance) {
  app.addHook('onRequest', verifyJWT)

  const wishlistRepository = new PrismaWishlistRepository()

  // GET
  const getWishlistUseCase = new GetWishlistItemsByUserIdUseCase(wishlistRepository)
  const getWishlistController = new GetWishlistItemByUserIdController(getWishlistUseCase)
  
  app.get('/', async (req, reply) => {
    return getWishlistController.handle(req, reply)
  })

  // CREATE
  const createWishlistItemUseCase = new CreateWishlistItemUseCase(wishlistRepository)
  const createWishlistItemController = new CreateWishlistItemController(createWishlistItemUseCase)
  
  app.post('/', async (req, reply) => {
    return createWishlistItemController.handle(req, reply)
  })

  // DELETE
  const deleteWishlistItemUseCase = new DeleteWishlistItemUseCase(wishlistRepository)
  const deleteWishlistItemController = new DeleteWishlistItemController(deleteWishlistItemUseCase)

  app.delete('/', async (req, reply) => {
    return deleteWishlistItemController.handle(req, reply)
  })
}
