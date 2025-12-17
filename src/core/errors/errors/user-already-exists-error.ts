import type { UseCaseError } from "@/core/errors/use-case-error"

export class UserAlreadyExistsError extends Error implements UseCaseError{
  constructor() {
    super('User with same e-mail address already exists.')
  }
}