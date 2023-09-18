import { DiscountedPrice, Price } from '@commercetools/platform-sdk';

export default function calculatePrice(
  target: DiscountedPrice | Price
): number {
  return target.value.centAmount / 10 ** target.value.fractionDigits;
}
