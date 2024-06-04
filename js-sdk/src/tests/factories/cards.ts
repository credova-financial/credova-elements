import { CardsCreateInput } from '@/types/sdk/cards'

export function generateCardCreateInput(
  override: object = {}
): CardsCreateInput {
  return {
    card: {
      number: '4242424242424242',
      cvc: '123',
      expirationMonth: '12',
      expirationYear: (new Date().getFullYear() + 1).toString(),
      ...override
    }
  }
}
