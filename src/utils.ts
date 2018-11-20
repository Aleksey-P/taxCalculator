export class Utils {
  public static safetyPlus(a: number, b: number): number {
    return (a * 100 + b * 100) / 100;
  }
}