import { IsotopeNode } from "../src/node";
import { createIsotopeNode } from "./utils";
import "../src/nodes";

type Tags =
	| "div"
	| "blockquote"
	| "embed"
	| "button"
	| "details"
	| "area"
	| "address"
	| "caption"
	| "a";

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
			child = parent[tag as Tags]();
		}

		expect(child.element.tagName).toBe(tag.toUpperCase());
	});
});
