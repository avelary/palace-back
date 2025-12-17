import { Address } from "../../enterprise/entities/address"

export interface AddressRepository {
  findManyByUserId(id: string): Promise<Address[]>
  findById(id: string): Promise<Address | null>
  create(Address: Address): Promise<void>
  delete(Address: Address): Promise<void>
  edit(Address: Address): Promise<void>
}