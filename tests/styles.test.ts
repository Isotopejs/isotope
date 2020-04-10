import { createIsotopeNode } from "./utils";
import "../src/configurators/styles";

describe("create IsotopeNode", () => {
	test("with styles", () => {
		const node = createIsotopeNode({
			styles: {
				height: 100
			}
		});

		expect(node.element.style!.height).toBe("100px");
		expect(node.getStyle("height")).toBe("100px");
	});
	test("with dynamic styles", () => {
		const node = createIsotopeNode({
			state: {
				height: 100
			},
			styles: (node) => ({
				height: node.getState("height") || 0
			})
		});

		node.setState({ height: 200 });
		expect(node.getStyle("height")).toBe("200px");
	});
	test("with periodical styles", () => {
		const node = createIsotopeNode({
			styles: {
				height: 100
			}
		});

		expect(node.getStyle("height")).toBe("100px");
		node.setStyle("height", "200px");
		expect(node.getStyle("height")).toBe("200px");
	});
});
