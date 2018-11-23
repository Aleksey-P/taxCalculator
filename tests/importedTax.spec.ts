import chai from 'chai';
import { ImportTax, Commodity } from '../src/models';

describe('Import Tax', () => {
  const importTax = new ImportTax();

  describe('Calculate Tax', () => {
    describe('[SUCCESS CASES]', () => {
      it('Calculate Tax for 1.85', () => {
        const expectedTax = 0.95;

        const commodityToCalculate = new Commodity({
          name: 'imported Test',
          count: 1,
          originalPrice: 18.5
        });

        const result = importTax.calculateTax(commodityToCalculate);

        chai.expect(result).equal(expectedTax);
      });

      it('Calculate Tax for 0.99 and round up to the nearest multiple of 0.05 (0.05)', () => {
        const expectedTax = 0.05;

        const commodityToCalculate = new Commodity({
          name: 'imported Test',
          count: 1,
          originalPrice: 0.99
        });

        const result = importTax.calculateTax(commodityToCalculate);

        chai.expect(result).equal(expectedTax);
      });

      it('Calculate Tax for 5.814234 and round up to the nearest multiple of 0.05 (0.30)', () => {
        const expectedTax = 0.30;

        const commodityToCalculate = new Commodity({
          name: 'imported Test',
          count: 1,
          originalPrice: 5.814234
        });

        const result = importTax.calculateTax(commodityToCalculate);

        chai.expect(result).equal(expectedTax);
      });

      it('Calculate Tax with zero', () => {
        const expectedTax = 0;

        const commodityToCalculate = new Commodity({
          name: 'imported Test',
          count: 1,
          originalPrice: 0
        });

        const result = importTax.calculateTax(commodityToCalculate);

        chai.expect(result).equal(expectedTax);
      });

      it('Calculate Tax without keyword "imported"', () => {
        const expectedTax = 0;

        const commodityToCalculate = new Commodity({
          name: 'Test',
          count: 3,
          originalPrice: 53.1
        });

        const result = importTax.calculateTax(commodityToCalculate);

        chai.expect(result).equal(expectedTax);
      });
    });
  });
});
