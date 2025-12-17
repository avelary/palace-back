import { FastifyTypedInstance } from '@/infra/types/provider'
import { productRoutes } from './product'
import { userRoutes } from './account'
import { authenticateRoutes } from './authenticate'
import { wishlistRoutes } from './wishlist'
import { addressRoutes } from './address'
import { paymentRoutes } from './payment'
import { orderRoutes } from './order'
import { orderitemRoutes } from './order-item'
import { productAttachmentRoutes } from './product-attachment'
import { cartRoutes } from './cart'
import { cartItemRoutes } from './cart-item'
import { uploadRoutes } from './upload'
import { checkoutRoutes } from './checkout'

export async function setupRoutes(app: FastifyTypedInstance) {
  app.register(authenticateRoutes, {prefix: '/'})
  app.register(userRoutes, {prefix: '/accounts'})
  app.register(productRoutes, { prefix: '/products' })
  app.register(productAttachmentRoutes, {prefix: '/attachments'})
  app.register(wishlistRoutes, {prefix: '/wishlist'})
  app.register(addressRoutes, {prefix: '/address'})
  app.register(paymentRoutes, {prefix: '/payments'})
  app.register(orderRoutes, {prefix: '/orders'})
  app.register(orderitemRoutes, {prefix: '/order-items'})
  app.register(cartRoutes, {prefix: '/cart'})
  app.register(cartItemRoutes, {prefix: 'cart-items'})
  app.register(uploadRoutes)
  app.register(checkoutRoutes, {prefix: 'checkout'})
}