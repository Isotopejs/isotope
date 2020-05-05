import { IsotopeNode } from "../src/node";
import { createIsotopeNode } from "./utils";
import "../src/nodes/conditional";

/** @private */
const setupConditionalNode = (dynamic?: boolean): IsotopeNode => {
	const config = {
		// prettier-ignore
		state: dynamic ? {
			condition: true
		} : {}
	};

	return createIsotopeNode(config).if(
		(node) => {
			const dynamicCondition = node.getState("condition");

			return typeof dynamicCondition === "undefined" ? true : dynamicCondition || false;
		},
		(node) => node.child("p"),
		(node) => node.child("span")
	);
};

describe("create IsotopeNode", () => {
	test("with conditional child", () => {
		const node = setupConditionalNode();

		expect(node.element.children[0].tagName).toBe("P");
	});
	test("with dynamic conditional child", () => {
		const node = setupConditionalNode(true);

		node.setState({ condition: false });
		expect(node.element.children[0].tagName).toBe("SPAN");
	});
});
