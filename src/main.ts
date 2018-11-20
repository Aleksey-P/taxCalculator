import { TaxCalculator } from './calculator';
import { Commodity } from './commodity';
import { Utils } from './utils';

export class Main {
  public static handleShopingItemInput(data: string): void {
    const commodities = Main.createCommodities(data);
    commodities.map((commodity) => commodity.taxes = TaxCalculator.calculateTax(commodity));

    const outputString = Main.getOutputString(commodities);
    process.stdout.write(outputString);
  }

  private static getOutputString(items: ShoppingItem[]): string {
    let outputString = '';
    let taxes = 0;
    let total = 0;

    items.map((item) => {
      taxes = Utils.safetyPlus(taxes, item.taxes);
      total = Utils.safetyPlus(total, item.fullPrice);
      outputString += `- ${item.name}: ${item.fullPrice}\n`;
    });

    outputString += `Sales Taxes: ${taxes}\nTotal: ${total}\n`;

    return outputString;
  }

  private static createCommodities(data: string): Commodity[] {
    const commoditiesValues = data.split(' \\ ');

    const result: Commodity[] = [];
    for (let i = 0; i < commoditiesValues.length; i++) {
      const parsedCommodity = commoditiesValues[i].split(' at ');

      result.push(new Commodity({
        name: parsedCommodity[0],
        price: parseFloat(parsedCommodity[1]),
      }));
    }

    return result;
  }
}

export interface ShoppingItem {
  name: string;
  taxes: number;
  fullPrice: number;
}
