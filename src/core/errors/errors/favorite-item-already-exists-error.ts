import type { UseCaseError } from "../use-case-error";

export class FavoriteItemAlreadyExistsError extends Error implements UseCaseError{
  constructor() {
    super('Favorite item already exist.')
  }
}