import { faker } from "@faker-js/faker"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Inventory, InventoryProps } from "@/domain/e-commerce/enterprise/entities/inventory"

export function makeInventory(override: Partial<InventoryProps> = {}, id?: UniqueEntityID) {
  const inventory =  Inventory.create({
    productId: new UniqueEntityID(),
    quantityAvailable: faker.number.int(),
    warehouseLocation: faker.lorem.sentence(),
    ...override
  }, id);

  return inventory
}