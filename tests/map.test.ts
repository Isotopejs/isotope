import { IsotopeNode } from "../src/node";
import { createIsotopeNode } from "./utils";
import "../src/nodes/map";

describe("create IsotopeNode", () => {
	/** @private */
	const setupMappedNode = (dynamic?: boolean): IsotopeNode => {
		const items = ["div", "span", "p"];
		const config = {
			// prettier-ignore
			state: dynamic ? {
				items
			} : {}
		};

		return createIsotopeNode(config).map(
			(node) => {
				const dynamicItems = node.getState("items");

				return dynamicItems || items;
			},
			(item, node) => {
				return node.child(item);
			}
		);
	};

	test("with child map", () => {
		const node = setupMappedNode();

		expect(node.element.children[0].tagName).toBe("DIV");
		expect(node.element.children[1].tagName).toBe("SPAN");
		expect(node.element.children[2].tagName).toBe("P");
	});
	test("with dynamic child map", () => {
		const node = setupMappedNode(true);

		node.setState({ items: ["p", "a", "span"] });
		expect(node.element.children[0].tagName).toBe("P");
		expect(node.element.children[1].tagName).toBe("A");
		expect(node.element.children[2].tagName).toBe("SPAN");
	});
});
