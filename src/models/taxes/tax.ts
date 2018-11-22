import { TaxValues } from '../../shared';

export abstract class Tax {
  protected taxValue: TaxValues;

  constructor(taxValue: TaxValues) {
    this.taxValue = taxValue;
  }

  public getTaxValue(price: number, count: number): number {
    return this.roundTax(price * this.taxValue) * count;
  }

  private roundTax(price: number): number {
    return Math.ceil(price / 0.05) * 0.05;
  }
}
