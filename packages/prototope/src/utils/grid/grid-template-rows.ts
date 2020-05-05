import { Util } from "../../declarations";
import { createUtil } from "../util";

type GridTemplateRows = 1 | 2 | 3 | 4 | 5 | 6 | "none";

/**
 * Prototope grid-template-rows util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const gridRows = (value: GridTemplateRows): Util => {
	let processedValue = "";

	if (typeof value === "number") {
		processedValue = `repeat(${value},minmax(0,1fr))`;
	} else {
		processedValue = "none";
	}

	return createUtil({ gridTemplateRows: processedValue });
};

export { gridRows };
