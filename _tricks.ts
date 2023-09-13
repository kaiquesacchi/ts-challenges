/** Extends
 * If `T` extends `K`, a value that satisfies `T` must also satisfy `K`
 */

type IsNumber<T> = T extends number ? true : false;
type ZeroIsNumber = IsNumber<0>;

/**
 * To create a new generic type reference, you can use the `infer` keyword inside the `extends`
 * conditional.
 *
 * */

type MyReturnType<T> = T extends (...args: any) => infer Return ? Return : never;
