/** Add `await` usability */
export type Awaitable<V> = V | PromiseLike<V>;

/** Make some properties partial */
export type PartialKeys<T, K extends keyof T> =
  & Omit<T, K>
  & Partial<Pick<T, K>>;

/** Make every property partial */
export type PartialExcept<T, K extends keyof T> =
  & Omit<Partial<T>, K>
  & Required<Pick<T, K>>;

/** Make some properties required */
export type RequiredKeys<T, K extends keyof T> =
  & Omit<T, K>
  & Required<Pick<T, K>>;

/** Make every property required */
export type RequiredExcept<T, K extends keyof T> =
  & Omit<Required<T>, K>
  & Partial<Pick<T, K>>;

/** Make every property nullable */
export type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

/** Make some properties nullable */
export type Nullify<T, K extends keyof T> = Omit<T, K> & Nullable<Pick<T, K>>;
