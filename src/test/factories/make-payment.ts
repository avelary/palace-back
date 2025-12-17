import { faker } from "@faker-js/faker"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Payment, PaymentProps } from "@/domain/e-commerce/enterprise/entities/payment";


export function makePayment(override: Partial<PaymentProps> = {}, id?: UniqueEntityID) {
  const inventory =  Payment.create({
    orderId: new UniqueEntityID(),
    amount: faker.number.float(),
    status: 'pending',
    paymentMethod: faker.finance.transactionType(),
    transactionId: faker.finance.currencyCode(),
    ...override
  }, id);

  return inventory
}