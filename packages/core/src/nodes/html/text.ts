import { Child, registerChild } from "./register";

declare module "../../node" {
	interface IsotopeNode {
		del: Child;
		ins: Child;
		a: Child;
		abbr: Child;
		b: Child;
		bdi: Child;
		bdo: Child;
		br: Child;
		cite: Child;
		code: Child;
		data: Child;
		dfn: Child;
		em: Child;
		i: Child;
		kbd: Child;
		mark: Child;
		q: Child;
		rb: Child;
		rp: Child;
		rt: Child;
		rtc: Child;
		ruby: Child;
		s: Child;
		samp: Child;
		small: Child;
		span: Child;
		strong: Child;
		sub: Child;
		sup: Child;
		time: Child;
		u: Child;
		var: Child;
		wbr: Child;
	}
}

const nodes = [
	"del",
	"ins",
	"a",
	"abbr",
	"b",
	"bdi",
	"bdo",
	"br",
	"cite",
	"code",
	"data",
	"dfn",
	"em",
	"i",
	"kbd",
	"mark",
	"q",
	"rb",
	"rp",
	"rt",
	"rtc",
	"ruby",
	"s",
	"samp",
	"small",
	"span",
	"strong",
	"sub",
	"sup",
	"time",
	"u",
	"var",
	"wbr"
];

nodes.forEach((name) => {
	registerChild(name);
});
