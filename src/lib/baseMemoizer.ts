export const memoizer = (fun: Function) => {
  let cache = new Map();
  return function (n: any) {
    if (typeof cache.get(n) !== "undefined") {
      return cache.get(n);
    } else {
      let result = fun(n);
      cache.set(n, result);
      return result;
    }
  };
};
