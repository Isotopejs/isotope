import { Child, registerChild } from "./register";

declare module "../../node" {
	interface IsotopeNode {
		address: Child;
		article: Child;
		aside: Child;
		footer: Child;
		header: Child;
		h1: Child;
		h2: Child;
		h3: Child;
		h4: Child;
		h5: Child;
		h6: Child;
		hgroup: Child;
		main: Child;
		nav: Child;
		section: Child;
	}
}

const nodes = [
	"address",
	"article",
	"aside",
	"footer",
	"header",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"hgroup",
	"main",
	"nav",
	"section"
];

nodes.forEach((name) => {
	registerChild(name);
});
