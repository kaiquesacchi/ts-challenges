/** Extends
 *
 * If `T extends K`, a value that satisfies `T` must also satisfy `K`
 * T is stricter than K, and not the other way around.
 */

type TExtendsK<T> = T extends number ? true : false;
type ZeroIsNumber = TExtendsK<0>;
//   ^?
/* ---------------------------------------------------------------------------------------------- */

/** Infer
 *
 * To create a new inferred type reference, you can use the `infer` keyword inside the `extends`
 * conditional.
 *
 */

type InferReturnType<T> = T extends (...args: any) => infer Return
  ? Return
  : never;
type InferredReturnType = InferReturnType<() => 1>;
//   ^?
/* ---------------------------------------------------------------------------------------------- */

/** Readonly
 * You can declare a readonly property by adding `readonly` before the key, and remove it with
 * `-readonly`
 */

type WithReadonly = { readonly a: 1 };
//   ^?
type WithoutReadonly = {
  -readonly [Key in keyof WithReadonly]: WithReadonly[Key];
};
//   ^?
/* ---------------------------------------------------------------------------------------------- */
