/* eslint-disable @typescript-eslint/no-magic-numbers */
import { IsotopeNode } from "../src/node";
import { createIsotopeNode } from "./utils";
import "../src/nodes/map";

const objectItems = [{ id: "div" }, { id: "span" }, { id: "p" }];
const stringItems = ["div", "span", "p"];
const numberItems = [0, 1, 2];
const tagTable = ["div", "span", "p", "a"];
/** @private */
const setupMappedNode = <T extends string | number | { id: string }>(
	dynamic?: boolean,
	dataType: "string" | "number" | "object" = "string"
): IsotopeNode => {
	let items: T[] = stringItems as T[];

	if (dataType === "number") {
		items = numberItems as T[];
	} else if (dataType === "object") {
		items = objectItems as T[];
	}

	const config = {
		// prettier-ignore
		state: dynamic ? {
			items
		} : {}
	};

	return createIsotopeNode(config).map(dynamic ? "items" : items, (item, node) => {
		let tag = "";

		if (typeof item === "string") {
			tag = item;
		} else if (typeof item === "number") {
			tag = tagTable[item];
		} else {
			tag = (item as { id: string }).id;
		}

		return node.child(tag);
	});
};

describe("create IsotopeNode", () => {
	test("with child map", () => {
		const node = setupMappedNode(false, "number");

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
	test("with rerendered child map", () => {
		const node = setupMappedNode(true, "object");

		node.setState({ items: [] });
		node.setState({ items: ["div", "span", "p"] });
		expect(node.element.children[0].tagName).toBe("DIV");
		expect(node.element.children[1].tagName).toBe("SPAN");
		expect(node.element.children[2].tagName).toBe("P");
	});
});
