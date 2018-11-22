import { ShoppingItem } from './interfaces';
import { Commodity } from './models';
import { MathOperations, StringOperations } from './shared';
import { BasicTax } from './models';
import { ImportTax } from './models';
import { NewCommodity } from './interfaces';

export class Main {
  private static currentTaxes = [new BasicTax(), new ImportTax()];

  public static handleShopingItemInput(data: string): void {
    let commodities: Commodity[];

    try {
      commodities = Main.createCommodities(data);
    } catch (e) {
      Main.writeInputFormatMessage();
      return;
    }

    Main.currentTaxes.map((tax) => {
      commodities.map((commodity) => {
        commodity.taxes = MathOperations.safetyPlus(commodity.taxes, tax.calculateTax(commodity));
      });
    });

    const outputString = Main.getOutputString(commodities);
    process.stdout.write(outputString);
  }

  public static writeInputFormatMessage(): void {
    process.stdout.write('Please, use next input fromat: \n{{Count}} {{Name}} at {{Price}} \\ {{Count}} {{Name}} at {{Price}}\n');
  }

  private static getOutputString(items: ShoppingItem[]): string {
    let outputString = '';
    let taxes = 0;
    let total = 0;

    items.map((item) => {
      taxes = MathOperations.safetyPlus(taxes, item.taxes);
      total = MathOperations.safetyPlus(total, item.fullPrice);
      outputString += `- ${item.count} ${item.name}: ${item.fullPrice}\n`;
    });

    outputString += `Sales Taxes: ${taxes}\nTotal: ${total}\n`;

    return outputString;
  }

  private static createCommodities(data: string): Commodity[] {
    const commoditiesValues = data.split(' \\ ');

    const result: Commodity[] = [];
    for (let i = 0; i < commoditiesValues.length; i++) {
      const parsedCommodity = Main.parseInputCommodityValues(commoditiesValues[i]);
      Main.checkInputCommodityItemValues(parsedCommodity.name, parsedCommodity.count, parsedCommodity.originalPrice);

      result.push(new Commodity(parsedCommodity));
    }

    return result;
  }

  private static parseInputCommodityValues(values: string): NewCommodity {
    const parsedCommodityValues = values.split(' at ');
    const endOfCountIndex = parsedCommodityValues[0].indexOf(' ') + 1;
    const countSubstring = parsedCommodityValues[0].trim().slice(0, endOfCountIndex);

    return {
      name: parsedCommodityValues[0].slice(endOfCountIndex).toLowerCase(),
      count: parseInt(countSubstring),
      originalPrice: parseFloat(StringOperations.deleteAllCommas(parsedCommodityValues[1]))
    }
  }

  private static checkInputCommodityItemValues(name: string, count: number, price: number): void {
    if (name.length === 0 || isNaN(count) || count < 1 || isNaN(price) || price < 0) {
      throw new Error();
    }
  }
}
