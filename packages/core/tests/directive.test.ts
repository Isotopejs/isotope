import { IsotopeNode } from "../src/node";
import { createIsotopeNode } from "./utils";
import "../src/configurators/styles";

/** @private */
const setupNode = (): IsotopeNode => {
	return createIsotopeNode({
		context: {
			firstProperty: Math.random()
		}
	});
};
/** @private */
const directive = (node: IsotopeNode): void => {
	const height = 100;

	node.setStyle("height", height);
};
/** @private */
const component = (node: IsotopeNode): IsotopeNode => {
	const child = node.child("div");

	node.link(child);

	return child;
};

describe("create IsotopeNode", () => {
	test("with directive", () => {
		const node = setupNode();

		node.$(directive);
		expect(node.element.style!.height).toBe("100px");
	});
	test("with component-like directive", () => {
		const node = setupNode();

		node.$(component);
		expect(node.linked![0].element.tagName).toBe("DIV");
	});
});
