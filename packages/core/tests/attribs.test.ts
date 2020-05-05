import { createIsotopeNode } from "./utils";
import "../src/configurators/attribs";

describe("create IsotopeNode", () => {
	test("with attribs", () => {
		const node = createIsotopeNode({
			attribs: {
				height: "100px"
			}
		});

		expect(node.element.getAttribute("height")).toBe("100px");
		expect(node.getAttrib("height")).toBe("100px");
	});
	test("with dynamic attribs", () => {
		const node = createIsotopeNode({
			attribs: (node) => ({
				height: node.getState("height")
			}),
			state: {
				height: "100px"
			}
		});

		node.setState({ height: "200px" });
		expect(node.getAttrib("height")).toBe("200px");
	});
	test("with periodical attribs", () => {
		const node = createIsotopeNode({
			attribs: {
				height: "100px"
			}
		});

		expect(node.getAttrib("height")).toBe("100px");
		node.setAttrib("height");
		expect(node.getAttrib("height")).toBe(null);
	});
});
