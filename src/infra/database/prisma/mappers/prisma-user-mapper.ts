import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User } from '@/domain/e-commerce/enterprise/entities/user'
import { User as prismaUser, Prisma, RoleSelect, GenderSelect} from '@prisma/client'

export class PrismaUserMapper {
  static toDomain(raw: prismaUser): User {
    return User.create({
      name: raw.name,
      email: raw.email,
      password: raw.password,
      role: raw.role,
      gender: raw.gender,
      image: raw.image,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt
    }, new UniqueEntityID(raw.id))
  }

  static toPrisma(user: User): Omit<Prisma.UserUncheckedCreateInput, 'updatedAt'> {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role as RoleSelect,
      gender: user.gender as GenderSelect,
      image: user.image ?? '',
      createdAt: user.createdAt,
    }
  }
}