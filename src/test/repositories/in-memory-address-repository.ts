import { AddressRepository } from "@/domain/e-commerce/application/repositories/address-repository"
import { Address } from "@/domain/e-commerce/enterprise/entities/address"


export class InMemoryAddressRepository implements AddressRepository{
  public items: Address[] = []

  async findManyByUserId(id: string): Promise<Address[]> {
    const addresses = this.items.filter(item => item.userId.toString() === id)

    return addresses
  }

  async findById(id: string): Promise<Address | null> {
    const address = this.items.find(item => item.id.toString() === id)

    if (!address) {
      return null
    }

    return address
  }

  async create(Address: Address): Promise<void> {
    this.items.push(Address)
  }

  async delete(address: Address) {
    const itemIndex = this.items.findIndex((item) => item.id === address.id)

    this.items.splice(itemIndex, 1)
  }

  async edit(address: Address): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === address.id)

    this.items[itemIndex] = address
  }
}