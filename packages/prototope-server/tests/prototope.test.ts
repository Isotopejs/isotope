import * as breakpoints from "@isotope/prototope/src/breakpoints";
import * as subSelectors from "@isotope/prototope/src/sub-selectors";
import * as utils from "@isotope/prototope/src/utils";
import { createMatcher, createWrapper } from "./utils";
import { Util } from "@isotope/prototope/src/declarations";
import testCases from "./test-cases.json";

interface TestCase {
  breakpoint?: keyof typeof breakpoints;
  match: string;
  subSelector?: keyof typeof subSelectors;
  util: TestUtil | TestUtil[];
}

type TestUtil =
  | keyof typeof utils
  | { name: keyof typeof utils; parameter?: string | number };

/**
 * Processes test util(s) to Isotope directive(s) form.
 *
 * @param util - Test util(s) to be processed.
 * @returns - Isotope directive(s).
 */
const processUtil = (util: TestUtil | TestUtil[]): Util | Util[] => {
  if (Array.isArray(util)) {
    return util.map((util) => processUtil(util) as Util);
  }

  if (typeof util === "object") {
    return (utils[util.name] as (parameter?: string | number) => Util)(
      util.parameter
    );
  }

  return utils[util] as Util;
};

describe("Create proper CSS rule", () => {
  describe.each([
    ["with breakpoints", testCases.breakpoints],
    ["with sub-selectors", testCases.subSelectors],
    ["with basic utils", testCases.utils],
  ])("%s", (name, testCases) => {
    test.each(testCases as any)("%#", (testCase) => {
      const { breakpoint, match, subSelector, util } = testCase as TestCase;
      const matcher = createMatcher(match);
      const wrapper = createWrapper();
      const processedUtil = processUtil(util);
      const breakpointFn = breakpoint ? breakpoints[breakpoint] : null;
      const subSelectorFn = subSelector ? subSelectors[subSelector] : null;

      if (breakpointFn && subSelectorFn) {
        wrapper.node.div(breakpointFn(subSelectorFn(processedUtil)));
      } else if (breakpointFn) {
        wrapper.node.div(breakpointFn(processedUtil));
      } else if (subSelectorFn) {
        wrapper.node.div(subSelectorFn(processedUtil));
      } else {
        wrapper.node.div(processedUtil);
      }

      const css = wrapper.getCSS();
      const matches = matcher.test(css);

      if (!matches) {
        // eslint-disable-next-line no-console
        console.log(`CSS: ${css} Matcher: ${matcher}`);
      }

      expect(matches).toBeTruthy();
    });
  });
});
