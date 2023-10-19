export type Reverse<T extends string | number | bigint> =
  `${T}` extends `${infer IFirst}${infer IRest}`
    ? `${Reverse<IRest>}${IFirst}`
    : "";
