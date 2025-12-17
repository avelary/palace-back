import { AppError } from '@/infra/utils/app-error'
import type { FastifyError, FastifyInstance } from 'fastify'
import { ZodError } from 'zod'

export function setupErrorHandling(app: FastifyInstance) {
  app.setErrorHandler((error: FastifyError, _request, reply) => {
    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({
        message: error.errorMessage
      })
    }

    if (error instanceof ZodError) {
      return reply.status(400).send({
        message: 'validation error', 
        issues: error.format()
      })
    }

    return reply.status(500).send({
      message: 'internal server error',
      error: error.message
    })
  })
}