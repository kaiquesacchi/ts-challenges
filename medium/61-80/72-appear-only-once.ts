/*
  9898 - Appear only once
  -------
  by X.Q. Chen (@brenner8023) #medium

  ### Question

  Find the elements in the target array that appear only once. For example：input: `[1,2,2,3,3,4,5,6,6,6]`，output: `[1,4,5]`.

  > View on GitHub: https://tsch.js.org/9898
*/

/* _____________ Your Code Here _____________ */

type FindElements<
  T extends any[],
  TExcluded extends T[number] = never
> = T extends [infer IFirst, ...infer IRest]
  ? IFirst extends TExcluded
    ? // Has already been excluded, skip.
      FindElements<IRest, TExcluded>
    : // Hasn't been excluded yet
    IFirst extends IRest[number]
    ? // Repeats in the future
      FindElements<IRest, TExcluded | IFirst>
    : // Never repeats
      [IFirst, ...FindElements<IRest, TExcluded>]
  : [];

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";
import { ExpectFalse, NotEqual } from "@type-challenges/utils";

type cases = [
  Expect<Equal<FindElements<[1, 2, 2, 3, 3, 4, 5, 6, 6, 6]>, [1, 4, 5]>>,
  Expect<Equal<FindElements<[2, 2, 3, 3, 6, 6, 6]>, []>>,
  Expect<Equal<FindElements<[1, 2, 3]>, [1, 2, 3]>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9898/answer
  > View solutions: https://tsch.js.org/9898/solutions
  > More Challenges: https://tsch.js.org
*/
