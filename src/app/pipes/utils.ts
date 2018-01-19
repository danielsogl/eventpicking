/**
 * isString
 * @param  {any} value value
 * @returns valueisstring
 */
export function isString(value: any): value is string {
  return typeof value === 'string';
}
/**
 * isNumberFinite
 * @param  {any} value value
 * @returns valueisnumber
 */
export function isNumberFinite(value: any): value is number {
  return isNumber(value) && isFinite(value);
}
/**
 * isInteger
 * @param  {number} value value
 * @returns boolean
 */
export function isInteger(value: number): boolean {
  // No rest, is an integer
  return value % 1 === 0;
}
/**
 * isPositive
 * @param  {number} value value
 * @returns boolean
 */
export function isPositive(value: number): boolean {
  return value >= 0;
}
/**
 * isUndefined
 * @param  {any} value value
 * @returns valueisundefined
 */
export function isUndefined(value: any): value is undefined {
  return typeof value === 'undefined';
}
/**
 * isNull
 * @param  {any} value value
 * @returns valueisnull
 */
export function isNull(value: any): value is null {
  return value === null;
}
/**
 * isNumber
 * @param  {any} value value
 * @returns valueisnumber
 */
export function isNumber(value: any): value is number {
  return typeof value === 'number';
}
/**
 * toDecimal
 * @param  {number} value value
 * @param  {number} decimal decimal
 * @returns number
 */
export function toDecimal(value: number, decimal: number): number {
  return Math.round(value * Math.pow(10, decimal)) / Math.pow(10, decimal);
}
