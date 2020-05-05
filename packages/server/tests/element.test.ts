/* eslint-disable max-lines-per-function */
import { StringElement } from "../src/element";

describe("create StringElement implementing", () => {
	test("proper tag name", () => {
		const element = new StringElement("div");

		expect(element.tagName).toBe("DIV");
	});
	test("classList", () => {
		const element = new StringElement("div");

		element.classList.add("one", "two", "three");
		element.classList.remove("two");
		expect(element.classList.contains("one")).toBe(true);
		expect(element.classList.contains("two")).toBe(false);
		expect(element.classList.contains("three")).toBe(true);
	});
	test("event listening", () => {
		const element = new StringElement("div");

		let invoked = 0;

		const listener = (): void => {
			invoked += 1;
		};

		element.addEventListener("event", listener);
		element.dispatchEvent({ type: "event" });
		element.removeEventListener("event", listener);
		element.dispatchEvent({ type: "event" });
		expect(invoked).toBe(1);
	});
	test("attributes", () => {
		const element = new StringElement("div");

		element.setAttribute("one", "1");
		element.setAttribute("two", "2");
		element.removeAttribute("two");
		expect(element.getAttribute("one")).toBe("1");
		expect(element.getAttribute("two")).toBe(null);
	});
	test("node hierarchy", () => {
		const element = new StringElement("div");
		const firstChild = new StringElement("span");
		const secondChild = new StringElement("p");
		const thirdChild = new StringElement("a");

		element.appendChild(thirdChild);
		element.appendChild(secondChild);
		element.insertBefore(firstChild, secondChild);
		element.removeChild(thirdChild);
		expect(element.children[0]).toBe(firstChild);
		expect(element.children[1]).toBe(secondChild);
	});
	test("stringification", () => {
		const element = new StringElement("div");
		const child = new StringElement("span");

		element.setAttribute("example", "value");
		element.style.backgroundColor = "green";
		element.classList.add("className");
		element.appendChild(child);
		expect(`${element}`).toBe(
			`<div class="className" style="background-color: green;" example="value"><span></span></div>`
		);
	});
	test("class attribute retrieval", () => {
		const element = new StringElement("div");

		element.classList.add("one", "two", "three");
		expect(element.getAttribute("class")).toBe("one two three");
	});
	test("class attribute setting", () => {
		const element = new StringElement("div");

		element.setAttribute("class", "one two");
		expect(element.classList.contains("one")).toBe(true);
		expect(element.classList.contains("two")).toBe(true);
		expect(element.classList.contains("three")).toBe(false);
	});
	test("style attribute retrieval", () => {
		const element = new StringElement("div");

		element.style.WebkitAppearance = "none";
		element.style.backgroundColor = "green";
		element.style.width = "100%";
		expect(element.getAttribute("style")).toBe(
			"-webkit-appearance: none; background-color: green; width: 100%;"
		);
	});
	test("style attribute setting", () => {
		const element = new StringElement("div");

		element.setAttribute(
			"style",
			"-webkit-appearance: none; background-color: green; width: 100%;"
		);
		expect(element.style.WebkitAppearance).toBe("none");
		expect(element.style.backgroundColor).toBe("green");
		expect(element.style.width).toBe("100%");
	});
});
