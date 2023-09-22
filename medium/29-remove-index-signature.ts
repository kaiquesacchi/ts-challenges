/*
  1367 - Remove Index Signature
  -------
  by hiroya iizuka (@hiroyaiizuka) #medium #object-keys

  ### Question

  Implement `RemoveIndexSignature<T>` , exclude the index signature from object types.

  For example:

  ```ts
  type Foo = {
    [key: string]: any
    foo(): void
  }

  type A = RemoveIndexSignature<Foo> // expected { foo(): void }
  ```

  > View on GitHub: https://tsch.js.org/1367
*/

/* _____________ Your Code Here _____________ */

type RemoveIndexSignature<
  T,
  /* Will evaluate for each PropertyKey option (string, number, symbol) */
  P = PropertyKey
> = {
  /* Will cycle through all `T` keys. For each:  */
  [IKey in keyof T as P extends IKey
    ? /* For P (`string` | `number` | `symbol`) to extend `IKey`:
    - `IKey` must also be one of those primitives, as `string` **does not** `extends 'a'`;
    - We need to evaluate separately the types that compose the `PropertyKey` union (that's the
    reason for creating the generic P, forcing ts to evaluate for each possibility) 
    
    This will only happen when the `IKey` is a generic Index Signature */
      never
    : /* As we were forced to check for each option of PropertyKey, it will still evaluate against
    the other *wrong* types (e.g.: `string extends number) and will bypass the first filter. We
    can fix this by filtering those cases out, checking if it extends P.
    */
    IKey extends P
    ? IKey
    : never]: T[IKey]; // Generic keys won't extend the primitive
};

type a = RemoveIndexSignature<Bar>;
//   ^?

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type Foo = {
  [key: string]: any;
  foo(): void;
};

type Bar = {
  [key: number]: any;
  bar(): void;
  0: string;
};

const foobar = Symbol("foobar");
type FooBar = {
  [key: symbol]: any;
  [foobar](): void;
};

type Baz = {
  bar(): void;
  baz: string;
};

type cases = [
  Expect<Equal<RemoveIndexSignature<Foo>, { foo(): void }>>,
  Expect<Equal<RemoveIndexSignature<Bar>, { bar(): void; 0: string }>>,
  Expect<Equal<RemoveIndexSignature<FooBar>, { [foobar](): void }>>,
  Expect<Equal<RemoveIndexSignature<Baz>, { bar(): void; baz: string }>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/1367/answer
  > View solutions: https://tsch.js.org/1367/solutions
  > More Challenges: https://tsch.js.org
*/
