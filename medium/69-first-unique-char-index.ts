/*
  9286 - FirstUniqueCharIndex
  -------
  by jiangshan (@jiangshanmeta) #medium #string

  ### Question

  Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1. (Inspired by [leetcode 387](https://leetcode.com/problems/first-unique-character-in-a-string/))

  > View on GitHub: https://tsch.js.org/9286
*/

/* _____________ Your Code Here _____________ */
type Min<T, TCount extends true[] = []> = [T] extends [never]
  ? -1
  : TCount["length"] extends T
  ? TCount["length"]
  : Min<T, [...TCount, true]>;

type FirstUniqueCharIndex<
  T extends string,
  TDict extends Record<string, number | never> = {},
  TCount extends true[] = []
> = T extends `${infer IFirst}${infer IRest}`
  ? // Popular dict
    FirstUniqueCharIndex<
      IRest,
      {
        [Key in keyof TDict | IFirst]: Key extends IFirst
          ? TDict[IFirst] extends number
            ? never
            : TCount["length"]
          : TDict[Key];
      },
      [...TCount, true]
    >
  : // Checar no dict qual é o menor
    Min<TDict[keyof TDict]>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<FirstUniqueCharIndex<"leetcode">, 0>>,
  Expect<Equal<FirstUniqueCharIndex<"loveleetcode">, 2>>,
  Expect<Equal<FirstUniqueCharIndex<"aabb">, -1>>,
  Expect<Equal<FirstUniqueCharIndex<"">, -1>>,
  Expect<Equal<FirstUniqueCharIndex<"aaa">, -1>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9286/answer
  > View solutions: https://tsch.js.org/9286/solutions
  > More Challenges: https://tsch.js.org
*/
