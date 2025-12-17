import { app } from './app'
import { env } from './env'
import 'dotenv/config'


const PORT = Number(env.PORT) || 3333

app.listen({port: PORT, host: '0.0.0.0'})
    .then(() => {
      console.log(`🌍 Servidor rodando na porta ${PORT}`)
      console.log(`📚 Documentação: http://localhost:${PORT}/docs`)
    })
    .catch((err) => {
      console.log('Internal server error', err)
      process.exit(1)
    })