/*
  298 - Length of String
  -------
  by Pig Fang (@g-plane) #medium #template-literal

  ### Question

  Compute the length of a string literal, which behaves like `String#length`.

  > View on GitHub: https://tsch.js.org/298
*/

/* _____________ Your Code Here _____________ */

/*
  String.length is typed as `number`, but Array.length is the literal length.
  For getting an array length, first you need to create an array of the same length, and then get
  the length from the created array.
*/

type LengthOfString<S extends string, TCount extends Array<true> = []> =
  S extends `${string}${infer TRest}`
    ? LengthOfString<TRest, [true, ...TCount]>
    : TCount['length']

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'
type a = LengthOfString<'kumiko'>
//   ^?

type cases = [
  Expect<Equal<LengthOfString<''>, 0>>,
  Expect<Equal<LengthOfString<'kumiko'>, 6>>,
  Expect<Equal<LengthOfString<'reina'>, 5>>,
  Expect<Equal<LengthOfString<'Sound! Euphonium'>, 16>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/298/answer
  > View solutions: https://tsch.js.org/298/solutions
  > More Challenges: https://tsch.js.org
*/
