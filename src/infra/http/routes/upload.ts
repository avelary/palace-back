import { FastifyInstance } from 'fastify'
import { UploadController } from '../controllers.ts/upload.js' 
import { verifyJWT } from '../middleware/verify-jwt.js'

export async function uploadRoutes(app: FastifyInstance) {
  const uploadController = new UploadController()

  app.post('/upload', uploadController.upload)
  app.get('/uploads/:imageName', uploadController.show)
}