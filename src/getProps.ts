export const get = <T>() => {
  type PropValCouple = {
    prop: keyof T;
    val: T[keyof T];
  };
  class FancyArr {
    private vals: Record<string, PropValCouple[]> = {};
    private lastItem = 0;

    constructor(prop: keyof T, val: any) {
      this.vals[this.lastItem] = [{ prop, val }];
    }

    get and() {
      return this;
    }

    get or() {
      this.lastItem++;
      return this;
    }

    get<K extends keyof T>(prop: K, val: T[K]): FancyArr & string {
      this.vals[this.lastItem] = this.vals[this.lastItem] || [];
      this.vals[this.lastItem].push({ prop, val });
      return this;
    }

    toString() {
      return Object.values(this.vals)
        .map((group) => {
          return group.map((ands) => `.${ands.prop}_${ands.val}`).join("");
        })
        .join(",");
    }
  }

  return <K extends keyof T>(propKey: K, propVal: T[K]) => {
    return new FancyArr(propKey, propVal);
  };
};
