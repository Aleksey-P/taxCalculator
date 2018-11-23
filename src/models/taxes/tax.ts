import { TaxValues, MathOperations } from '../../shared';

export abstract class Tax {
  protected taxValue: TaxValues;

  constructor(taxValue: TaxValues) {
    this.taxValue = taxValue;
  }

  public getTaxValue(price: number, count: number): number {
    return MathOperations.roundNumToMultipleOf(price * this.taxValue, 0.05) * count;
  }
}
