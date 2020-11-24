import { memoizer } from "./baseMemoizer";

type AnyObject = Record<string, any>;

type FormattedObj = {
  conditions: ConditonObj[];
  specificity: number;
  styles: AnyObject;
};

type ConditonObj = {
  propName: string;
  propVal: string;
};

const sortBySpecificity = (a: FormattedObj, b: FormattedObj) =>
  a.specificity - b.specificity;

const formatCustomRules = (customObj: AnyObject) => {
  const customRules: FormattedObj[] = [];

  Object.keys(customObj).forEach((key) => {
    const groups = key.split(",").map((g) => g.trim());

    groups.forEach((group) => {
      const conditions = group
        .split(".")
        .filter(Boolean)
        .map((condition) => {
          console.log("looping through");

          const [, propName, propVal] = condition.match(/(.+)_(.+)/) || [];

          if (!propName) {
            console.error(condition, "is not a valid format rule");
          }

          return { propName, propVal };
        });

      customRules.push({
        conditions,
        specificity: conditions.length,
        styles: customObj[key]
      });
    });
  });

  return customRules;
};

const getRules = (customObj: AnyObject): [AnyObject, FormattedObj[]] => {
  const cssRules: AnyObject = {},
    propVariants: AnyObject = {};

  Object.keys(customObj).forEach((key) => {
    if (key.match(/\.[a-zA-Z]+_[a-zA-Z]/)) {
      propVariants[key] = customObj[key];
    } else {
      cssRules[key] = customObj[key];
    }
  });
  console.log(cssRules);

  const formattedCustomRules: FormattedObj[] = formatCustomRules(
    propVariants
  ).sort(sortBySpecificity);

  return [cssRules, formattedCustomRules];
};

// let's make sure not to run this logic if the rules haven't changed
const memoizedRules = memoizer(getRules) as typeof getRules;

export const applyFromTheme = (themeKey: string) => (
  props: AnyObject & { theme: AnyObject }
) => {
  const [cssRules, formattedCustomRules] = memoizedRules(props.theme[themeKey]);

  return formattedCustomRules.reduce(
    (acc: AnyObject, { conditions, styles }) => {
      if (
        conditions.every(({ propName, propVal }) => {
          return (
            props[propName] && props[propName].toString() === propVal.toString()
          );
        })
      ) {
        acc = {
          ...acc,
          ...styles
        };
      }
      return acc;
    },
    { ...cssRules }
  );
};
