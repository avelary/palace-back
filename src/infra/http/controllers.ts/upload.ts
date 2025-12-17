import { FastifyRequest, FastifyReply } from 'fastify'
import { UPLOADS_DIR } from '@/infra/config/upload' 
import { pipeline } from 'stream/promises'
import path from 'path'
import fs from 'fs'

export class UploadController {
  async upload(request: FastifyRequest, reply: FastifyReply) {
    try {
      const data = await request.file()

      if (!data) {
        return reply.status(400).send({ message: 'Nenhum arquivo enviado' })
      }

      // Criar a pasta caso não exista
      if (!fs.existsSync(UPLOADS_DIR)) {
        fs.mkdirSync(UPLOADS_DIR, { recursive: true })
      }

      // Define o nome final do arquivo
      const ext = path.extname(data.filename)
      const filename = `${Date.now()}${ext}`
      const filepath = path.join(UPLOADS_DIR, filename)

      // Salvar arquivo localmente
      await pipeline(data.file, fs.createWriteStream(filepath))

      return reply.status(201).send({
        imageUrl: filename,
        message: 'Upload realizado com sucesso'
      })
    } catch (error) {
      request.log.error(error)
      return reply.status(500).send({ message: 'Erro ao fazer upload' })
    }
  }

  async show(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { imageName } = request.params as { imageName: string }

      const imagePath = path.join(UPLOADS_DIR, imageName)

      if (!fs.existsSync(imagePath)) {
        return reply.status(404).send({ message: 'Imagem não encontrada' })
      }

      const stats = fs.statSync(imagePath)
      reply.header('Content-Length', stats.size)

      const ext = path.extname(imagePath).toLowerCase()
      const mimeType =
        ext === '.jpg' || ext === '.jpeg'
          ? 'image/jpeg'
          : ext === '.png'
          ? 'image/png'
          : 'application/octet-stream'

      return reply.type(mimeType).send(fs.createReadStream(imagePath))
    } catch (error) {
      request.log.error(error)
      return reply.status(500).send({ message: 'Erro ao buscar imagem' })
    }
  }
}
