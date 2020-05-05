import { Util } from "../../declarations";
import { createUtil } from "../util";

type Width =
	| 0
	| 1
	| 2
	| 3
	| 4
	| 5
	| 6
	| 8
	| 10
	| 12
	| 16
	| 20
	| 24
	| 32
	| 40
	| 48
	| 56
	| 64
	| "1/2"
	| "1/3"
	| "2/3"
	| "1/4"
	| "2/4"
	| "3/4"
	| "1/5"
	| "2/5"
	| "3/5"
	| "4/5"
	| "1/6"
	| "2/6"
	| "3/6"
	| "4/6"
	| "5/6"
	| "1/12"
	| "2/12"
	| "3/12"
	| "4/12"
	| "5/12"
	| "6/12"
	| "7/12"
	| "8/12"
	| "9/12"
	| "10/12"
	| "11/12"
	| "px"
	| "auto"
	| "full"
	| "screen";

/**
 * Prototope width util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const w = (value: Width): Util => {
	const divider = 4;
	const percentMultiplier = 100;

	let processedValue = "";

	if (value === 0) {
		processedValue = "0";
	} else if (value === "px") {
		processedValue = "1px";
	} else if (value === "auto") {
		processedValue = "auto";
	} else if (value === "full") {
		processedValue = "100%";
	} else if (value === "screen") {
		processedValue = "100vw";
	} else if (typeof value === "number") {
		processedValue = `${value / divider}rem`;
	} else {
		const [num1, num2] = value.split("/");

		processedValue = `${(Number(num1) / Number(num2)) * percentMultiplier}%`;
	}

	return createUtil({ width: processedValue });
};

export { w };
