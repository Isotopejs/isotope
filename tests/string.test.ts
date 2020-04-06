/**
 * @jest-environment node
 */

import { createStringView } from "../src/views/string";
import "../src/nodes/conditional";

describe("render to string", () => {
	test("statically", () => {
		const view = createStringView("body");

		view.child("div");
		expect(`${view}`).toBe("<body><div></div></body>");
	});
	test("dynamically", () => {
		const view = createStringView("body");
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

		expect(`${view}`).toBe("<body><div><p></p></div></body>");
		node.setState({ condition: false });
		expect(`${view}`).toBe("<body><div><span></span></div></body>");
	});
});
