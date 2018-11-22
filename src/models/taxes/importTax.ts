import { CalculatableTax, ShoppingItem } from '../../interfaces';
import { Tax } from './tax';
import { TaxValues, ImportedTaxKeywords } from '../../shared';

export class ImportTax extends Tax implements CalculatableTax {
  constructor() {
    super(TaxValues.importTax);
  }

  public calculateTax(item: ShoppingItem): number {
    if (item.name.indexOf(ImportedTaxKeywords.imported) === -1) return 0;

    return this.getTaxValue(item.originalPrice, item.count);
  }
}
