import { createIsotopeNode } from "./utils";

describe("create IsotopeNode", () => {
	test("which listens to events", () => {
		const node = createIsotopeNode();

		let clicks = 0;

		node.on("click", () => {
			clicks += 1;
		});
		((node.element as any) as HTMLElement).click();
		expect(clicks).toBe(1);
	});
	test("which emits events", () => {
		const node = createIsotopeNode();
		const eventName = "custom-event";

		let counter = 0;

		node.on(eventName, () => {
			counter += 1;
		});
		node.emit(eventName);
		expect(counter).toBe(1);
	});
	test("which periodically listens to events", () => {
		let counter = 0;

		const eventName = "custom-event";
		const listener = (): void => {
			counter += 1;
		};
		const node = createIsotopeNode();

		node.on(eventName, listener);
		node.emit(eventName);
		node.off(eventName, listener);
		node.emit(eventName);
		expect(counter).toBe(1);
	});
});
