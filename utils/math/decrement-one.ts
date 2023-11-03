import { Reverse } from "../string-manipulation";

/** Decrements 1 from a number, returns result as a number
 * @example ```
 * DecrementsOne<40> => 39
 * ```
 */
export type DecrementOne<T extends number> = Reverse<
  DecrementOneFromReverse<Reverse<T>>
> extends `${infer IResult extends number}`
  ? IResult
  : never;

/** Decrements 1 from a reversed number (as string), returns result as reversed string
 * @param A Must be the string representation of a whole number greater than 0
 *
 * @example ```
 * DecrementsOneFromReverse<"123"> => "023"
 * ```
 */
export type DecrementOneFromReverse<A extends string> =
  A extends `${infer IHead}${infer IRest}`
    ? IHead extends "0"
      ? `9${DecrementOneFromReverse<IRest>}`
      : `${DigitBefore[IHead & keyof DigitBefore]}${IRest}`
    : never;

type DigitBefore = {
  "1": "0";
  "2": "1";
  "3": "2";
  "4": "3";
  "5": "4";
  "6": "5";
  "7": "6";
  "8": "7";
  "9": "8";
};
