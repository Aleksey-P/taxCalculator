import { CalculatableTax, ShoppingItem } from '../../interfaces';
import { TaxValues, NoBasicTaxKeywords } from '../../shared';
import { Tax } from './tax';

export class BasicTax extends Tax implements CalculatableTax {
  constructor() {
    super(TaxValues.basicTax);
  }

  public calculateTax(item: ShoppingItem): number {
    for (let key in NoBasicTaxKeywords) {
      if (item.name.indexOf(NoBasicTaxKeywords[key]) > -1) return 0;
    }

    return this.getTaxValue(item.originalPrice, item.count);
  }
}
