import chai from 'chai';
import { BasicTax, Commodity } from '../src/models';

describe('Basic Tax', () => {
  const basicTax = new BasicTax();

  describe('Calculate Tax', () => {
    describe('[SUCCESS CASES]', () => {
      it('Calculate Tax for 1.85', () => {
        const expectedTax = 1.85;

        const commodityToCalculate = new Commodity({
          name: 'Test',
          count: 1,
          originalPrice: 18.5
        });

        const result = basicTax.calculateTax(commodityToCalculate);

        chai.expect(result).equal(expectedTax);
      });

      it('Calculate Tax for 0.99 and round up to the nearest multiple of 0.05 (0.1)', () => {
        const expectedTax = 0.1;

        const commodityToCalculate = new Commodity({
          name: 'Test',
          count: 1,
          originalPrice: 0.99
        });

        const result = basicTax.calculateTax(commodityToCalculate);

        chai.expect(result).equal(expectedTax);
      });

      it('Calculate Tax for 5.814234 and round up to the nearest multiple of 0.05 (0.6)', () => {
        const expectedTax = 0.6;

        const commodityToCalculate = new Commodity({
          name: 'Test',
          count: 1,
          originalPrice: 5.814234
        });

        const result = basicTax.calculateTax(commodityToCalculate);

        chai.expect(result).equal(expectedTax);
      });

      it('Calculate Tax with zero', () => {
        const expectedTax = 0;

        const commodityToCalculate = new Commodity({
          name: 'Test',
          count: 1,
          originalPrice: 0
        });

        const result = basicTax.calculateTax(commodityToCalculate);

        chai.expect(result).equal(expectedTax);
      });

      it('Calculate Tax with keyword "candy"', () => {
        const expectedTax = 0;

        const commodityToCalculate = new Commodity({
          name: 'candy',
          count: 1,
          originalPrice: 5.05
        });

        const result = basicTax.calculateTax(commodityToCalculate);

        chai.expect(result).equal(expectedTax);
      });

      it('Calculate Tax with keyword "coffee"', () => {
        const expectedTax = 0;

        const commodityToCalculate = new Commodity({
          name: 'coffee',
          count: 1,
          originalPrice: 5.05
        });

        const result = basicTax.calculateTax(commodityToCalculate);

        chai.expect(result).equal(expectedTax);
      });
    });
  });
});
