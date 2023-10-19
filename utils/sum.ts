import { Reverse } from "./string-manipulation";

export type Sum<A extends number | string, B extends number | string> = Reverse<
  _Add<Reverse<A>, Reverse<B>>
> extends `${infer IResult extends number}`
  ? IResult
  : never;

type _Add<A, B> = A extends `${infer AH}${infer AT}`
  ? B extends `${infer BH}${infer BT}`
    ? BH extends "0"
      ? `${AH}${_Add<AT, BT>}`
      : _Add<AddOne<A>, SubOne<B>>
    : A
  : B;

type DigsNext = {
  "0": "1";
  "1": "2";
  "2": "3";
  "3": "4";
  "4": "5";
  "5": "6";
  "6": "7";
  "7": "8";
  "8": "9";
};
type DigsPrev = { [K in keyof DigsNext as DigsNext[K]]: K };

/** Adds 1 to a reversed number */
type AddOne<A> = A extends `${infer AH}${infer AT}`
  ? AH extends "9"
    ? `0${AddOne<AT>}`
    : `${DigsNext[AH & keyof DigsNext]}${AT}`
  : "1";

/** Subtracts 1 from a reversed number */
type SubOne<A> = A extends `${infer AH}${infer AT}`
  ? AH extends "0"
    ? `9${SubOne<AT>}`
    : `${DigsPrev[AH & keyof DigsPrev]}${AT}`
  : never;
