import { Encrypter } from "@/domain/e-commerce/application/encryption/encrypter"

export class FakeEncrypter implements Encrypter {
  async encrypt(payload: any) {
    return JSON.stringify(payload)
  }
}
