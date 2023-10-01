/*
  4182 - Fibonacci Sequence
  -------
  by windliang (@wind-liang) #medium

  ### Question

  Implement a generic `Fibonacci<T>` that takes a number `T` and returns its corresponding [Fibonacci number](https://en.wikipedia.org/wiki/Fibonacci_number).

  The sequence starts:
  1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...

  For example
  ```ts
  type Result1 = Fibonacci<3> // 2
  type Result2 = Fibonacci<8> // 21
  ```

  > View on GitHub: https://tsch.js.org/4182
*/

/* _____________ Your Code Here _____________ */
type Fibonacci<
  T extends number,
  TCurrentIndex extends true[] = [true], // Starts with 1
  TCurrentValue extends true[] = [true], // Starts with 1
  TLastValue extends true[] = [] // Starts with 0
> = T extends TCurrentIndex["length"]
  ? TCurrentValue["length"]
  : Fibonacci<
      T,
      [...TCurrentIndex, true], // Increments 1
      [...TCurrentValue, ...TLastValue], // Sums the current to the last value
      TCurrentValue // Current value becomes the last value
    >;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Fibonacci<1>, 1>>,
  Expect<Equal<Fibonacci<2>, 1>>,
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<8>, 21>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4182/answer
  > View solutions: https://tsch.js.org/4182/solutions
  > More Challenges: https://tsch.js.org
*/
