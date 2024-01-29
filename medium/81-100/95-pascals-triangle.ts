/*
  30958 - Pascal's triangle
  -------
  by Aswin S Vijay (@aswinsvijay) #medium #array #math

  ### Question

  Given a number N, construct the Pascal's triangle with N rows.
  [Wikipedia](https://en.wikipedia.org/wiki/Pascal%27s_triangle)

  > View on GitHub: https://tsch.js.org/30958
*/

/* _____________ Your Code Here _____________ */
type GenerateNextRow<
  LastRow extends number[],
  TCount extends true[] = [],
  Result extends number[] = [],
  LastValue extends number = 0,
  CurrentValue extends number = LastRow[TCount["length"]]
> = TCount["length"] extends LastRow["length"]
  ? [...Result, 1]
  : GenerateNextRow<
      LastRow,
      [...TCount, true],
      [...Result, Sum<LastValue, CurrentValue>],
      CurrentValue
    >;

type Pascal<
  N extends number,
  TCount extends true[] = [],
  TResult extends number[][] = []
> = TCount["length"] extends N
  ? TResult
  : Pascal<
      N,
      [...TCount, true],
      TResult extends [...number[][], infer ILast extends number[]]
        ? [...TResult, GenerateNextRow<ILast>]
        : [[1]]
    >;

type test = Pascal<6>;
//   ^?

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";
import { Sum } from "../../utils/math/sum";

type cases = [
  Expect<Equal<Pascal<1>, [[1]]>>,
  Expect<Equal<Pascal<3>, [[1], [1, 1], [1, 2, 1]]>>,
  Expect<
    Equal<Pascal<5>, [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]]>
  >,
  Expect<
    Equal<
      Pascal<7>,
      [
        [1],
        [1, 1],
        [1, 2, 1],
        [1, 3, 3, 1],
        [1, 4, 6, 4, 1],
        [1, 5, 10, 10, 5, 1],
        [1, 6, 15, 20, 15, 6, 1]
      ]
    >
  >
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/30958/answer
  > View solutions: https://tsch.js.org/30958/solutions
  > More Challenges: https://tsch.js.org
*/
