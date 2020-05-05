import { createIsotopeNode } from "./utils";
import "../src/configurators/classes";

describe("create IsotopeNode", () => {
	test("with classes", () => {
		const node = createIsotopeNode({
			classes: ["test"]
		});

		expect(node.element.classList.contains("test")).toBe(true);
		expect(node.hasClass("test")).toBe(true);
	});
	test("with dynamic classes", () => {
		const node = createIsotopeNode({
			classes: (node) => ({
				test: Boolean(node.getState("testClass"))
			}),
			state: {
				testClass: true
			}
		});

		node.setState({ testClass: false });
		expect(node.hasClass("test")).toBe(false);
	});
	test("with periodical classes", () => {
		const firstClass = "test";
		const secondClass = "second-test";
		const node = createIsotopeNode({
			classes: {
				test: true
			}
		});

		expect(node.hasClass(firstClass)).toBe(true);
		expect(node.hasClass(secondClass)).toBe(false);
		node.removeClass(firstClass);
		node.addClass(secondClass);
		expect(node.hasClass(firstClass)).toBe(false);
		expect(node.hasClass(secondClass)).toBe(true);
	});
});
