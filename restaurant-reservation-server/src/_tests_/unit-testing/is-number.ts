/**
 * @created 06/10/2021 - 13:04
 * @project express-ts-startup-project
 * @author  Shevan
 * @file    is-number
 */

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isNumber = (n: any) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
