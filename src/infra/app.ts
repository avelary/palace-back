import { fastify } from 'fastify'
import { env } from 'process'
import { 
  serializerCompiler, 
  validatorCompiler, 
  ZodTypeProvider,
  jsonSchemaTransform
} from 'fastify-type-provider-zod'

import fastifyJwt from '@fastify/jwt'
import cors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import scalarApiReference from '@scalar/fastify-api-reference'
import { setupErrorHandling } from './http/middleware/setup-error-handling'
import { setupRoutes } from './http/routes'
import fastifyMultipart from '@fastify/multipart'
import fastifyRawBody from 'fastify-raw-body'

const PORT = Number(env.PORT) || 3333

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyRawBody, {
  field: 'rawBody',
  global: false,
  encoding: 'utf8',
  runFirst: true,
})


app.register(fastifyJwt, {
  secret: {
    private: Buffer.from(process.env.JWT_PRIVATE_KEY!, 'base64'),
    public: Buffer.from(process.env.JWT_PUBLIC_KEY!, 'base64'),
  },
  sign: { algorithm: 'RS256' }
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'gynpass',
      version: '1.0.0',
    },
    servers: [{ url: `http://localhost:${PORT}` }],
  },
  transform: jsonSchemaTransform,
})

app.register(scalarApiReference, {
  routePrefix: "/docs",
  configuration: {
    layout: "sidebar", 
    theme: "mars",    
  },
})

app.register(fastifyMultipart, {
  limits: {
    fileSize: 10 * 1024 * 1024,
  }
})

setupRoutes(app)
setupErrorHandling(app)

export { app }