import { UserRepository } from "@/domain/e-commerce/application/repositories/user-repository"
import { prisma } from "../../prisma"
import { PrismaUserMapper } from "../mappers/prisma-user-mapper"
import { User } from "@/domain/e-commerce/enterprise/entities/user"


export class PrismaUserRepository implements UserRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({where: {email} })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }
  
  async findById(id: string) {
    const user = await prisma.user.findUnique({where: {id} })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }

  async create(user: User) {
    const data = PrismaUserMapper.toPrisma(user)
        
    await prisma.user.create({
      data,
    })
  }

  async delete(user: User) {
    await prisma.user.delete({
      where: { id: user.id.toString() },
    })
  }

  async edit(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user)
    
    await prisma.user.update({
      where: { id: user.id.toString() },
      data,
    })
  }
}