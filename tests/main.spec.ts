import chai from 'chai';
import { Main } from '../src/main';
import { Commodity } from '../src/models';

describe('Main', () => {
  describe('Create Commodities', () => {
    describe('[SUCCESS CASES]', () => {
      it('Create Commodity With Right Data', () => {
        const commoditiesData = [{
          count: 1,
          name: 'First Test Commdity',
          originalPrice: 12.53
        }, {
          count: 3,
          name: 'Second Test Commodity',
          originalPrice: 3431.4 // Another in string to test commas
        }, {
          count: 23,
          name: 'Third Test Commodity',
          originalPrice: 32
        }];

        const commoditiesValueString = `${commoditiesData[0].count} ${commoditiesData[0].name} at ${commoditiesData[0].originalPrice} \\` +
          ` ${commoditiesData[1].count} ${commoditiesData[1].name} at 3,4,,,,3,1.4 \\` +
          ` ${commoditiesData[2].count} ${commoditiesData[2].name} at ${commoditiesData[2].originalPrice}`;

        const result = Main.createCommodities(commoditiesValueString);

        chai.expect(result.length).equal(3);

        chai.expect(result[0] instanceof Commodity).to.be.true;
        chai.expect(result[1] instanceof Commodity).to.be.true;
        chai.expect(result[2] instanceof Commodity).to.be.true;

        for (let i = 0; i < 3; i++) {
          chai.expect(result[i].count).equal(commoditiesData[i].count);
          chai.expect(result[i].name).equal(commoditiesData[i].name.toLowerCase());
          chai.expect(result[i].originalPrice).equal(commoditiesData[i].originalPrice);
        }
      });
    })

    describe('[BAD CASES]', () => {
      it('Wrong Count', () => {
        const commoditiesValueString = '12 Right Commodity at 12.43 \\ ABC Wrong Commodity at 23.22';

        try {
          Main.createCommodities(commoditiesValueString);
        } catch (e) {
          chai.expect(e.message).equal('Wrong Input!');
        }
      });

      it('Empty Name', () => {
        const commoditiesValueString = '12 Right Commodity at 12.43 \\ 23 at 23.22';

        try {
          Main.createCommodities(commoditiesValueString);
        } catch (e) {
          chai.expect(e.message).equal('Wrong Input!');
        }
      });

      it('Wrong Price', () => {
        const commoditiesValueString = '12 Right Commodity at 12.43 \\ 23 Wrong Price Commodity at ASB';

        try {
          Main.createCommodities(commoditiesValueString);
        } catch (e) {
          chai.expect(e.message).equal('Wrong Input!');
        }
      });
    });
  });
});
