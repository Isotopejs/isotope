import { Child, registerChild } from "./register";

declare module "../../node" {
	interface IsotopeNode {
		blockquote: Child;
		dd: Child;
		div: Child;
		dl: Child;
		dt: Child;
		figcaption: Child;
		figure: Child;
		hr: Child;
		li: Child;
		main: Child;
		ol: Child;
		p: Child;
		pre: Child;
		ul: Child;
	}
}

const nodes = [
	"blockquote",
	"dd",
	"div",
	"dl",
	"dt",
	"figcaption",
	"figure",
	"hr",
	"li",
	"main",
	"ol",
	"p",
	"pre",
	"ul"
];

nodes.forEach((name) => {
	registerChild(name);
});
