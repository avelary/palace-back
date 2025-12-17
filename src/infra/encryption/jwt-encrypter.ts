import { Encrypter } from "@/domain/e-commerce/application/encryption/encrypter";
import { FastifyInstance } from "fastify";

export class JwtEncrypter implements Encrypter {
  constructor(private app: FastifyInstance) {}

  async encrypt(payload: Record<string, unknown>) {
    return this.app.jwt.sign(payload)
  }
}