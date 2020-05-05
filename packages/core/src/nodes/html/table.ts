import { Child, registerChild } from "./register";

declare module "../../node" {
	interface IsotopeNode {
		caption: Child;
		col: Child;
		colgroup: Child;
		table: Child;
		tbody: Child;
		td: Child;
		tfoot: Child;
		th: Child;
		thead: Child;
		tr: Child;
	}
}

const nodes = [
	"caption",
	"col",
	"colgroup",
	"table",
	"tbody",
	"td",
	"tfoot",
	"th",
	"thead",
	"tr"
];

nodes.forEach((name) => {
	registerChild(name);
});
