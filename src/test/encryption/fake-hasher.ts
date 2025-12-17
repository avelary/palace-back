import { HashComparer } from "@/domain/e-commerce/application/encryption/hash-comparer"
import { HashGenerator } from "@/domain/e-commerce/application/encryption/hash-generator"

export class FakeHasher implements HashGenerator, HashComparer {
  async hash(plain: string) {
    return plain.concat(`-hashed`)
  }

  async compare(plain: string, hash: string) {
    return plain.concat('-hashed') === hash
  }
}
