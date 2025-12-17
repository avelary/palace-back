import { UserRepository } from "@/domain/e-commerce/application/repositories/user-repository"
import { User } from "@/domain/e-commerce/enterprise/entities/user"

export class InMemoryUsersRepository implements UserRepository {
  public items: User[] = []

  async findByEmail(email: string) {
    const user = this.items.find(item => item.email === email)

    if (!user) {
      return null
    }

    return user
  }
  
  async findById(id: string) {
    const user = this.items.find(item => item.id.toString() === id)

    if(!user) {
      return null
    }

    return user
  }

  async create(user: User) {
    this.items.push(user)
  }

  async delete(user: User) {
    const itemIndex = this.items.findIndex((item) => item.id === user.id)
  
    this.items.splice(itemIndex, 1)
  }

  async edit(user: User) {
    const itemIndex = this.items.findIndex((item) => item.id === user.id)
  
    this.items[itemIndex] = user
  }
}