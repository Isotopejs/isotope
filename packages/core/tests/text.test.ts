import { IsotopeNode } from "../src/node";
import { createIsotopeNode } from "./utils";
import "../src/nodes/text";

/** @private */
const setupTextNode = (dynamic?: boolean): IsotopeNode => {
	const config = {
		// prettier-ignore
		state: dynamic ? {
			text: "Text"
		} : {}
	};

	return createIsotopeNode(config).text((node) => {
		const dynamicText = node.getState("text");

		return typeof dynamicText === "undefined" ? "Text" : dynamicText || "";
	});
};

describe("create IsotopeNode", () => {
	test("with text", () => {
		const node = setupTextNode();

		expect(node.element.textContent).toBe("Text");
	});
	test("with dynamic text", () => {
		const node = setupTextNode(true);

		node.setState({ text: "Different text" });
		expect(node.element.textContent).toBe("Different text");
	});
});
