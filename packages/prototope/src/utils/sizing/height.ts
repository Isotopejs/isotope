import { Util } from "../../declarations";
import { createUtil } from "../util";

type Height =
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
	| "px"
	| "auto"
	| "full"
	| "screen";

/**
 * Prototope height util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const h = (value: Height): Util => {
	const divider = 4;

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
		processedValue = "100vh";
	} else {
		processedValue = `${value / divider}rem`;
	}

	return createUtil({ height: processedValue });
};

export { h };
