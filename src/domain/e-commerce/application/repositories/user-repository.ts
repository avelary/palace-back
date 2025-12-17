import { User } from "../../enterprise/entities/user";

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  create(user: User): Promise<void>
  delete(user: User): Promise<void>
  edit(user: User): Promise<void>
}