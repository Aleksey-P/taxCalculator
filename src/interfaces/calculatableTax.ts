import { ShoppingItem } from '.';

export interface CalculatableTax {
  calculateTax: (item: ShoppingItem) => number;
}
