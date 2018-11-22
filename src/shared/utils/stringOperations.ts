export class StringOperations {
  public static deleteAllCommas(target: string): string {
    return target.replace(/\,/g, '');
  }
}
