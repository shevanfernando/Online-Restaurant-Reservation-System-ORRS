/**
 * @created 06/10/2021 - 13:10
 * @project express-ts-startup-project
 * @author  Shevan
 * @file    is-number.test
 */

import { isNumber } from './is-number';

describe('isNumber test', () => {
  it("It's a number", () => {
    [0, 1, -1, 1.345e17, '1'].map((n) => {
      expect(isNumber(n)).toEqual(true);
    });
  });

  it("It's not a number", () => {
    [false, true, NaN, '1a'].map((n) => {
      expect(isNumber(n)).toEqual(false);
    });
  });
});
