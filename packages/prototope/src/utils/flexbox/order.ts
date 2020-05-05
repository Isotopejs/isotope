import { Util } from "../../declarations";
import { createUtil } from "../util";

type Order = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "first" | "last" | "none";

/**
 * Prototope flex-grow util.
 *
 * @param order - Order value.
 * @returns - Prototope util.
 */
const order = (order: Order): Util => {
	let value = "";

	if (typeof order === "number") {
		value = `${order}`;
	} else if (order === "first") {
		value = "-9999";
	} else if (order === "last") {
		value = "9999";
	} else {
		value = "0";
	}

	return createUtil({ order: value as any });
};

export { order };
