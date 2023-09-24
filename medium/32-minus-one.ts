/*
  2257 - MinusOne
  -------
  by Mustafo Faiz (@fayzzzm) #medium #math

  ### Question

  Given a number (always positive) as a type. Your type should return the number decreased by one.

  For example:

  ```ts
  type Zero = MinusOne<1> // 0
  type FiftyFour = MinusOne<55> // 54
  ```

  > View on GitHub: https://tsch.js.org/2257
*/

/* _____________ Your Code Here _____________ */
/** Transforms strings to numbers, handling left-padding zeros */
type StringToNumber<TString extends string> =
  RemoveLeftPaddingZeros<TString> extends `${infer INumber extends number}`
    ? INumber
    : never;
type TestStringToNumber = StringToNumber<"099">;
//   ^?

/** Cheat-sheet of subtraction results, where `index - 1 = NumeralsShiftedDown[index]` */
type NumeralsShiftedDown = [9, 0, 1, 2, 3, 4, 5, 6, 7, 8];
/** Cheat-sheet of addition results, where `index + 1 = NumeralsShiftedUp[index]` */
type NumeralsShiftedUp = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

type IsNegative<T extends number> = `${T}` extends `-${string}` ? true : false;
type IsZero<T extends number> = T extends 0 ? true : false;
type Absolute<T extends number> = `${T}` extends `-${infer TMod extends number}`
  ? TMod
  : T;
type RemoveLeftPaddingZeros<T extends string> = T extends "0"
  ? T
  : T extends `0${infer IRest}`
  ? RemoveLeftPaddingZeros<IRest>
  : T;

/** Inverts a string. Useful for subtracting from left to right, instead of right to left */
type InvertString<
  T extends string,
  TResult extends string = ""
> = T extends `${infer IFirst}${infer IRest}`
  ? InvertString<IRest, `${IFirst}${TResult}`>
  : TResult;
type TestInvertString = InvertString<"12345">;
//   ^?

/** As it's easier to infer values from left to right, subtracts 1 from an inverted number */
type SubtractFromInverted<T extends string> =
  T extends `${infer IFirst extends number}${infer IRest}`
    ? IFirst extends 0
      ? `${NumeralsShiftedDown[IFirst]}${SubtractFromInverted<IRest>}`
      : `${NumeralsShiftedDown[IFirst]}${IRest}`
    : never;
type TestSubtractFromInverted = SubtractFromInverted<"021">;
//   ^?

/** As it's easier to infer values from left to right, adds 1 to an inverted number. Summing 1
 * to absolute value of a negative number and then negating it is equivalent to subtracting from
 * the original negative value
 */
type AddToInverted<T extends string> =
  T extends `${infer IFirst extends number}${infer IRest}`
    ? IFirst extends 9
      ? `${NumeralsShiftedUp[IFirst]}${AddToInverted<IRest>}`
      : `${NumeralsShiftedUp[IFirst]}${IRest}`
    : never;
type TestAddToInverted = AddToInverted<"921">;
//   ^?

type MinusOne<T extends number> = IsZero<T> extends true
  ? -1
  : IsNegative<T> extends true
  ? StringToNumber<`-${InvertString<
      AddToInverted<InvertString<`${Absolute<T>}`>>
    >}`>
  : StringToNumber<InvertString<SubtractFromInverted<InvertString<`${T}`>>>>;

type Test = MinusOne<-100>;
//   ^?

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
  Expect<Equal<MinusOne<0>, -1>>,
  Expect<Equal<MinusOne<9_007_199_254_740_992>, 9_007_199_254_740_991>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2257/answer
  > View solutions: https://tsch.js.org/2257/solutions
  > More Challenges: https://tsch.js.org
*/
