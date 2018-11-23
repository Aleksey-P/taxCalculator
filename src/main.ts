import { ShoppingItem } from './interfaces';
import { Commodity } from './models';
import { MathOperations, StringOperations } from './shared';
import { NewCommodity } from './interfaces';
import { TaxService } from './services';

export class Main {
  public static handleShoppingItemsInput(): void {
    const data = process.stdin.read() as string;
    if (data === null || data.length === 0) {
      Main.writeInputFormatMessage();
      return;
    }

    let items: ShoppingItem[] = [];
    try {
      items = Main.createCommodities(data);
    } catch (_) {
      Main.writeInputFormatMessage();
    }

    TaxService.calculateShoppingItemsTax(items);

    const outputString = Main.getOutputString(items);
    process.stdout.write(outputString);
  }

  public static createCommodities(data: string): Commodity[] {
    const commoditiesValues = data.split(' \\ ');

    const result: Commodity[] = [];
    for (const commodityString of commoditiesValues) {
      const parsedCommodity = Main.parseInputCommodityValues(commodityString);
      Main.checkInputCommodityItemValues(parsedCommodity.name, parsedCommodity.count, parsedCommodity.originalPrice);

      result.push(new Commodity(parsedCommodity));
    }

    return result;
  }

  private static writeInputFormatMessage(): void {
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

  private static parseInputCommodityValues(values: string): NewCommodity {
    const parsedCommodityValues = values.split(' at ');
    const endOfCountIndex = parsedCommodityValues[0].indexOf(' ') + 1;
    const countSubstring = parsedCommodityValues[0].trim().slice(0, endOfCountIndex);

    return {
      count: parseInt(countSubstring, 10),
      name: parsedCommodityValues[0].slice(endOfCountIndex).toLowerCase(),
      originalPrice: parseFloat(StringOperations.deleteAllCommas(parsedCommodityValues[1])),
    };
  }

  private static checkInputCommodityItemValues(name: string, count: number, price: number): void {
    if (name.length === 0 || isNaN(count) || count < 1 || isNaN(price) || price < 0) {
      throw new Error('Wrong Input!');
    }
  }
}
