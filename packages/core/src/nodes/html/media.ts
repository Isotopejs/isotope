import { Child, registerChild } from "./register";

declare module "../../node" {
	interface IsotopeNode {
		area: Child;
		audio: Child;
		img: Child;
		track: Child;
		video: Child;
	}
}

const nodes = ["area", "audio", "img", "track", "video"];

nodes.forEach((name) => {
	registerChild(name);
});
