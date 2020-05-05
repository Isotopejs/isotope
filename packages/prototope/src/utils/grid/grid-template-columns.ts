import { Util } from "../../declarations";
import { createUtil } from "../util";

type GridTemplateColumns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "none";

/**
 * Prototope grid-template-columns util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const gridCols = (value: GridTemplateColumns): Util => {
	let processedValue = "";

	if (typeof value === "number") {
		processedValue = `repeat(${value},minmax(0,1fr))`;
	} else {
		processedValue = "none";
	}

	return createUtil({ gridTemplateColumns: processedValue });
};

export { gridCols };
