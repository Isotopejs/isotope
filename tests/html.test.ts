import { createIsotopeNode } from "./utils";
import { IsotopeNode } from "../src/node";
import "../src/nodes";

const tags = [
	"div",
	"blockquote",
	"embed",
	"button",
	"details",
	"area",
	"address",
	"caption",
	"a"
];

describe("create IsotopeNode", () => {
	test.each(tags)("with %s child", (tag) => {
		const parent = createIsotopeNode();

		let child: IsotopeNode | null = null;

		if (tag === "div") {
			child = parent.child("div");
		} else {
			child = parent[tag]();
		}

		expect(child.element.tagName).toBe(tag.toUpperCase());
	});
});
