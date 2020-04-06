import { Child, registerChild } from "./register";

declare module "../../node" {
	interface IsotopeNode {
		details: Child;
		dialog: Child;
		menu: Child;
		summary: Child;
		canvas: Child;
		script: Child;
		noscript: Child;
		slot: Child;
		template: Child;
	}
}

const nodes = [
	"details",
	"dialog",
	"menu",
	"summary",
	"canvas",
	"script",
	"noscript",
	"slot",
	"template"
];

nodes.forEach((name) => {
	registerChild(name);
});
