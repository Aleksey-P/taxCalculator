export class TaxCalculator {
  public static calculateTax(element: Calculatable): number {
    let tax = 0;

    if (TaxCalculator.isBasicTaxNeeded(element.name.toLocaleLowerCase())) {
      tax += TaxCalculator.calculateBasicTax(element.price);
    }
    if (TaxCalculator.isImportTaxNeeded(element.name.toLocaleLowerCase())) {
      tax += TaxCalculator.calculateImportTax(element.price);
    }

    return tax;
  }

  private static basicTax = 0.1;
  private static importTax = 0.05;
  private static noBasicTaxGoods = ['coffee', 'popcorn', 'candy', 'skittles', 'snickers'];

  private static calculateBasicTax(price: number): number {
    return TaxCalculator.roundTax(price * TaxCalculator.basicTax);
  }

  private static calculateImportTax(price: number): number {
    return TaxCalculator.roundTax(price * TaxCalculator.importTax);
  }

  private static roundTax(price: number): number {
    return Math.ceil(price / 0.05) * 0.05;
  }

  private static isBasicTaxNeeded(commodityName: string): boolean {
    return TaxCalculator.noBasicTaxGoods.find((elem) => commodityName.indexOf(elem) > -1) === undefined;
  }

  private static isImportTaxNeeded(commodityName: string): boolean {
    return commodityName.indexOf('imported') > -1;
  }
}

export interface Calculatable {
  name: string;
  price: number;
}
