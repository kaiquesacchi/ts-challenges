/* ---------------------------------------------------------------------------------------------- */
/*                                           Conventions                                          */
/* ---------------------------------------------------------------------------------------------- */
/* 
Type names: PascalCase
Generic arguments: Always starting with `T`
Inferred arguments: Always starting with `I`
*/

/* ---------------------------------------------------------------------------------------------- */
/*                                            Variables                                           */
/* ---------------------------------------------------------------------------------------------- */
/*
"Variables" can be created by declaring a defaulted generic. It is a way to only calculate its value
once, and reuse it more cleanly.
*/

type Variables<
  T extends object,
  TKeys extends keyof T = keyof T // Variable
> = {
  [IKey in TKeys]: T[IKey];
};

/* ---------------------------------------------------------------------------------------------- */
/*                                             Extends                                            */
/* ---------------------------------------------------------------------------------------------- */
/*
If `T extends K`, a value that satisfies `T` must also satisfy `K`
T is stricter than K, and not the other way around.
*/
type ExtendsNumber<T> = T extends number ? true : false;

type ZeroExtendsNumber = ExtendsNumber<0>;
//   ^?

type NumberExtends<T> = number extends T ? true : false;

type NumberExtendsZero = NumberExtends<0>;
//   ^?

/* ---------------------------------------------------------------------------------------------- */
/*                                              Infer                                             */
/* ---------------------------------------------------------------------------------------------- */
/*
To create a new inferred type reference, you can use the `infer` keyword inside the `extends`
conditional.
*/
type InferReturnType<T> = T extends (...args: any) => infer IReturn
  ? IReturn
  : never;

type InferredReturnType = InferReturnType<() => 1>;
//   ^?

/* ---------------------------------------------------------------------------------------------- */
/*                                            Readonly                                            */
/* ---------------------------------------------------------------------------------------------- */
/*
You can declare a readonly property by adding `readonly` before the key, and remove it with
`-readonly`
*/

type WithReadonly = { readonly a: 1 };

type WithoutReadonly = {
  -readonly [Key in keyof WithReadonly]: WithReadonly[Key];
};

/* ---------------------------------------------------------------------------------------------- */
/*                                            Optional                                            */
/* ---------------------------------------------------------------------------------------------- */
/*
You can turn a property optional by adding `?:`, and required by adding `-?:`
*/
type AllOptional<T extends object> = {
  [Key in keyof T]?: T[Key];
};

type ExampleAllOptional = AllOptional<{ a: string; b: number }>;
//   ^?

type AllRequired<T extends object> = {
  [Key in keyof T]-?: T[Key];
};

type ExampleAllRequired = AllRequired<{ a?: string; b?: number }>;
//   ^?

/* ---------------------------------------------------------------------------------------------- */
/*                                            To String                                           */
/* ---------------------------------------------------------------------------------------------- */
/*
It is possible to cast a value to string by using template strings
*/

type ToString<T extends string | number | bigint | boolean | null | undefined> =
  `${T}`;

type NumberAsString = ToString<20>;
//   ^?

/* ---------------------------------------------------------------------------------------------- */
/*                                           From String                                          */
/* ---------------------------------------------------------------------------------------------- */
/*
Template strings can also be used to cast to other types
*/

type ToNumber<T extends string | number | bigint | boolean | null | undefined> =
  `${T}` extends `${infer ICast extends number}` ? ICast : never;

type StringAsNumber = ToNumber<"1234">;
//   ^?

/* ---------------------------------------------------------------------------------------------- */
/*                                         Detect `never`                                         */
/* ---------------------------------------------------------------------------------------------- */
/*
It is not possible to directly check if a value `extends never`, as nothing does, not even `never`
itself. It is possible to cast it to a tuple, and then compare it.
*/

type IsNever<T> = [T] extends [never] ? true : false;

type OneIsNotNever = IsNever<1>;
//   ^?

type NeverIsNever = IsNever<never>;
//   ^?

/* ---------------------------------------------------------------------------------------------- */
/*                                         Number Counter                                         */
/* ---------------------------------------------------------------------------------------------- */
/*
It is not possible to perform increments with numbers. To create a counter, an array can be used
(using its length). To increment it, just push an element to it. 
*/
type IsGreater<
  TA,
  TB,
  TCounter extends true[] = []
> = TA extends TCounter["length"]
  ? false
  : TB extends TCounter["length"]
  ? true
  : IsGreater<TA, TB, [...TCounter, true]>;

type ThreeGreaterThanOne = IsGreater<3, 1>;
//   ^?

type TwoGreaterThanFive = IsGreater<2, 5>;
//   ^?

/* ---------------------------------------------------------------------------------------------- */
/*                                      Constrain Object Key                                      */
/* ---------------------------------------------------------------------------------------------- */
/*
An object key can be constrained by adding a `as` after its inferred type and using conditional
types.
*/
type OmitUnderscoredKeys<T extends object> = {
  [Key in keyof T as Key extends `_${string}` ? never : Key]: T[Key];
};

type OmittedUnderscoredKeys = OmitUnderscoredKeys<{ a: 1; b: 2; _c: 3 }>;
//   ^?
