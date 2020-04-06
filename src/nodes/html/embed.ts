import { Child, registerChild } from "./register";

declare module "../../node" {
	interface IsotopeNode {
		embed: Child;
		iframe: Child;
		object: Child;
		param: Child;
		picture: Child;
		source: Child;
	}
}

const nodes = ["embed", "iframe", "object", "param", "picture", "source"];

nodes.forEach((name) => {
	registerChild(name);
});
