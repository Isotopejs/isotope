import { createIsotopeNode } from "./utils";
import { IsotopeNode } from "../src/node";
import "../src/nodes/conditional";

describe("create IsotopeNode", () => {
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

				return typeof dynamicCondition === "undefined" ? true : dynamicCondition;
			},
			(node) => node.child("p"),
			(node) => node.child("span")
		);
	};

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
