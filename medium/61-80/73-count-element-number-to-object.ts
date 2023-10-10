/*
  9989 - Count Element Number To Object
  -------
  by 凤之兮原 (@kongmingLatern) #medium

  ### Question

  With type ``CountElementNumberToObject``, get the number of occurrences of every item from an array and return them in an object. For example:

  ~~~ts
  type Simple1 = CountElementNumberToObject<[]> // return {}
  type Simple2 = CountElementNumberToObject<[1,2,3,4,5]>
  // return {
  //   1: 1,
  //   2: 1,
  //   3: 1,
  //   4: 1,
  //   5: 1
  // }

  type Simple3 = CountElementNumberToObject<[1,2,3,4,5,[1,2,3]]>
  // return {
  //   1: 2,
  //   2: 2,
  //   3: 2,
  //   4: 1,
  //   5: 1
  // }
  ~~~

  > View on GitHub: https://tsch.js.org/9989
*/

/* _____________ Your Code Here _____________ */
type Increment<
  TCount extends Record<PropertyKey, true[]>,
  TValue extends PropertyKey
> = {
  [Key in keyof TCount | TValue]: Key extends TValue
    ? Key extends keyof TCount
      ? [...TCount[Key], true]
      : [true]
    : TCount[Key];
};

type CountElementNumberToObject<
  T extends any[],
  TCount extends Record<PropertyKey, true[]> = {}
> = T extends [infer IFirst, ...infer IRest]
  ? // There are elements in the array
    [IFirst] extends [never]
    ? // Skips `never`
      CountElementNumberToObject<IRest, TCount>
    : // Continues with the rest
    IFirst extends any[]
    ? // The element is an array, and needs to be flattened
      CountElementNumberToObject<[...IFirst, ...IRest], TCount>
    : // The element is not an array, and may be added to the TCount
    IFirst extends string | number
    ? // Adds only strings and numbers to TCount
      `${IFirst}` extends `${infer IAsNumber extends number}`
      ? // The element can be converted to number
        CountElementNumberToObject<IRest, Increment<TCount, IAsNumber>>
      : // The element is a string
        CountElementNumberToObject<IRest, Increment<TCount, IFirst>>
    : // Skips others
      CountElementNumberToObject<IRest, TCount>
  : // There are no elements in the array
    { [Key in keyof TCount]: TCount[Key]["length"] };

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";
type cases = [
  Expect<
    Equal<
      CountElementNumberToObject<[1, 2, 3, 4, 5]>,
      {
        1: 1;
        2: 1;
        3: 1;
        4: 1;
        5: 1;
      }
    >
  >,
  Expect<
    Equal<
      CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3]]>,
      {
        1: 2;
        2: 2;
        3: 2;
        4: 1;
        5: 1;
      }
    >
  >,
  Expect<
    Equal<
      CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3, [4, 4, 1, 2]]]>,
      {
        1: 3;
        2: 3;
        3: 2;
        4: 3;
        5: 1;
      }
    >
  >,
  Expect<Equal<CountElementNumberToObject<[never]>, {}>>,
  Expect<
    Equal<
      CountElementNumberToObject<["1", "2", "0"]>,
      {
        0: 1;
        1: 1;
        2: 1;
      }
    >
  >,
  Expect<
    Equal<
      CountElementNumberToObject<["a", "b", ["c", ["d"]]]>,
      {
        a: 1;
        b: 1;
        c: 1;
        d: 1;
      }
    >
  >
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9989/answer
  > View solutions: https://tsch.js.org/9989/solutions
  > More Challenges: https://tsch.js.org
*/
