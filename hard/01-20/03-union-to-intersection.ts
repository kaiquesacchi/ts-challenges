/*
  55 - Union to Intersection
  -------
  by Zheeeng (@zheeeng) #hard #utils #infer

  ### Question

  Implement the advanced util type `UnionToIntersection<U>`

  For example

  ```ts
  type I = UnionToIntersection<'foo' | 42 | true> // expected to be 'foo' & 42 & true
  ```

  > View on GitHub: https://tsch.js.org/55
*/

/* _____________ Your Code Here _____________ */

type UnionToIntersection<U> =
  // U is an union. We want to transform it into an intersection without actually computing it.
  // To make this, we can use args of functions.
  (
    U extends any
      ? // Just to convert U into args of a function
        (arg: U) => any
      : // It will never `not extend any`
        never
  ) extends (arg: infer I) => void // Compares it to another function
    ? // For the functions to extend each other, I must extend all possible values of U. The only way
      // to do this would be to extend an intersection of all of them
      I
    : never;
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<UnionToIntersection<"foo" | 42 | true>, "foo" & 42 & true>>,
  Expect<
    Equal<
      UnionToIntersection<(() => "foo") | ((i: 42) => true)>,
      (() => "foo") & ((i: 42) => true)
    >
  >
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/55/answer
  > View solutions: https://tsch.js.org/55/solutions
  > More Challenges: https://tsch.js.org
*/
