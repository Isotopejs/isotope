import { createIsotopeNode } from "./utils";

test("create IsotopeNode with context", () => {
	const node = createIsotopeNode({
		context: {
			firstProperty: Math.random()
		}
	});
	const firstChild = node.child("div", {
		context: { secondProperty: Math.random() }
	});
	const secondChild = firstChild.child("div");

	expect(typeof node.getContext("firstProperty")).toBe("number");
	// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
	// @ts-ignore
	expect(typeof node.getContext("secondProperty")).toBe("undefined");
	expect(typeof firstChild.getContext("firstProperty")).toBe("number");
	expect(typeof firstChild.getContext("secondProperty")).toBe("number");
	expect(typeof secondChild.getContext("firstProperty")).toBe("number");
	expect(typeof secondChild.getContext("secondProperty")).toBe("number");
});
