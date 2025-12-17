import type { UseCaseError } from "../use-case-error";

export class InvalidQuantityError extends Error implements UseCaseError{
  constructor() {
    super('Quantity cannot be negative')
  }
}