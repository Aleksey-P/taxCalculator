import { ShoppingItem } from '../interfaces';
import { MathOperations } from '../shared/utils';
import { NewCommodity } from '../interfaces';

export class Commodity implements ShoppingItem {
  public name: string;
  public count: number;
  public originalPrice: number;
  public taxes = 0;
  public get fullPrice(): number {
    return parseFloat(Number.prototype.toFixed.call(MathOperations.safetyPlus(this.originalPrice, this.taxes), 5).toString());
  }

  constructor(params: NewCommodity) {
    this.name = params.name;
    this.originalPrice = params.originalPrice;
    this.count = params.count;
  }
}
