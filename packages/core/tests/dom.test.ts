import { createDOMView } from "../src/view";
import "../src/nodes/conditional";

describe("render to DOM", () => {
	test("statically", () => {
		const element = document.createElement("div");
		const view = createDOMView(element);

		view.child("div");
		expect(element.children[0].tagName).toBe("DIV");
	});
	test("dynamically", () => {
		const element = document.createElement("div");
		const view = createDOMView(element);
		const node = view
			.child("div", {
				state: {
					condition: true
				}
			})
			.if(
				"condition",
				(node) => {
					node.child("p");
				},
				(node) => {
					node.child("span");
				}
			);

		expect(element.children[0].tagName).toBe("DIV");
		expect(element.children[0].children[0].tagName).toBe("P");
		node.setState({ condition: false });
		expect(element.children[0].children[0].tagName).toBe("SPAN");
	});
	test("by attaching", () => {
		const element = document.createElement("div");
		const childElement = document.createElement("div");

		element.appendChild(childElement);

		const view = createDOMView(element, { attach: true });
		const child = view.child("div");

		expect(child.element).toBe(childElement);
	});
	test("without cleaning", () => {
		const element = document.createElement("div");
		const childElement = document.createElement("p");

		element.appendChild(childElement);

		const view = createDOMView(element, { clean: false });

		view.child("span");
		expect(element.children[0].tagName).toBe("P");
		expect(element.children[1].tagName).toBe("SPAN");
	});
});
