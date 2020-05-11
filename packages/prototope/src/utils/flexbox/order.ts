import { Util } from "../../declarations";
import { createUtil } from "../util";

type Order = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "first" | "last" | "none";

/**
 * Prototope flex-grow util.
 *
 * @param value - Order value.
 * @returns - Prototope util.
 */
const order = (value: Order): Util => {
	let processedValue = "";

	if (typeof value === "number") {
		processedValue = `${value}`;
	} else if (value === "first") {
		processedValue = "-9999";
	} else if (value === "last") {
		processedValue = "9999";
	} else {
		processedValue = "0";
	}

	return createUtil({ order: processedValue as any });
};

export { order };
