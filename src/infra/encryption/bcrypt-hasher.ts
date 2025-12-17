import { hash, compare } from "bcryptjs"
import { HashComparer } from "@/domain/e-commerce/application/encryption/hash-comparer"
import { HashGenerator } from "@/domain/e-commerce/application/encryption/hash-generator"

export class BcryptHasher implements HashGenerator, HashComparer {
  private HASH_SALT_LENGHT = 8
  
  hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGHT) 
  }

  compare(plain: string, hashed: string): Promise<boolean> {
    return compare(plain, hashed)
  }
}
