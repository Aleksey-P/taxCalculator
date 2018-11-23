export class MathOperations {
  public static safetyPlus(a: number, b: number): number {
    return MathOperations.toFixedWithoutZeros((a * 100 + b * 100) / 100);
  }

  public static toFixedWithoutZeros(num: number): number {
    return parseFloat(Number.prototype.toFixed.call(num, 2).toString());
  }

  public static roundNumToMultipleOf(price: number, multiple: number): number {
    return MathOperations.toFixedWithoutZeros(Math.ceil(price / multiple) * multiple);
  }
}
