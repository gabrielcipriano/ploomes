/* eslint-disable @typescript-eslint/no-explicit-any */

type Unpromisify<T> = T extends Promise<infer U> ? U : T

type Result<F extends (...args: any) => any> = 
  [undefined, Error] |
  [Unpromisify<ReturnType<F>>, undefined]

/**
 * A helper to try an async function without forking
 * the control flow. Returns [result, Error]
 */
export const resultify = <TFunc extends (...args: any[]) => any>(
  func: TFunc
) => {
  return async (...args: Parameters<TFunc>): Promise<Result<TFunc>> => {
    try {
      return [await func(...args), undefined];
    } catch (err) {
      return [undefined, err as Error];
    }
  };
};
