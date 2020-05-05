import { Prototope } from "../src/prototope";
import { createDOMView } from "@isotope/core";

/**
 * Creates a RegExp that matches the give configuration string.
 *
 * @param matcher - Matching string.
 * @returns - Created RegExp.
 */
const createMatcher = (matcher: string): RegExp => {
	return new RegExp(
		matcher.replace(/[$()*+.?[\\\]^{|}]/g, "\\$&").replace("className", "_.+?")
	);
};
/**
 * Creates Prototope wrapper for tests.
 *
 * @returns - Prototope wrapper.
 */
const createWrapper = (): Prototope => {
	const element = document.createElement("div");
	const view = createDOMView(element);

	return view.$(Prototope());
};

export { createMatcher, createWrapper };
