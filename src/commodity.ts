import { Calculatable } from './calculator';
import { Utils } from './utils';
import { ShoppingItem } from './main';

export class Commodity implements Calculatable, ShoppingItem {
  public name: string;
  public price: number;
  public taxes = 0;
  public get fullPrice(): number {
    return Math.ceil(Utils.safetyPlus(this.price, this.taxes) * 1000) / 1000;
  }

  constructor(params: { name: string; price: number }) {
    this.name = params.name;
    this.price = params.price;
  }
}
