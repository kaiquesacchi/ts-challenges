import { Reverse } from "../string-manipulation";

/** Increments 1 to a number, returns result as number
 *
 * @example ```
 * IncrementOne<123> => 124
 * ```
 */
export type IncrementOne<A extends number> = Reverse<
  IncrementOneFromReverse<Reverse<A>>
> extends `${infer IResult extends number}`
  ? IResult
  : never;

/** Increments 1 to a reversed number (as string), returns result as reversed string
 *
 * @example ```
 * IncrementOneFromReverse<"321"> => "421"
 * ```
 */
export type IncrementOneFromReverse<A extends string> =
  A extends `${infer AH}${infer AT}`
    ? AH extends "9"
      ? `0${IncrementOneFromReverse<AT>}`
      : `${DigitAfter[AH & keyof DigitAfter]}${AT}`
    : "1";

type DigitAfter = {
  "0": "1";
  "1": "2";
  "2": "3";
  "3": "4";
  "4": "5";
  "5": "6";
  "6": "7";
  "7": "8";
  "8": "9";
};
