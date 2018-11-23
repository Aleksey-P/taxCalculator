import { BasicTax, ImportTax } from '../models';
import { MathOperations } from '../shared';
import { ShoppingItem } from '../interfaces';

export class TaxService {
  public static currentTaxes = [new BasicTax(), new ImportTax()];

  public static calculateShoppingItemsTax(items: ShoppingItem[]): void {
    TaxService.currentTaxes.map((tax) => {
      items.map((item) => {
        item.taxes = MathOperations.safetyPlus(item.taxes, tax.calculateTax(item));
      });
    });
  }
}
