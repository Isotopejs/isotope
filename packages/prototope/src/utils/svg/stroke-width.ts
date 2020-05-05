import { Util } from "../../declarations";
import { createUtil } from "../util";

type StrokeWidth = 0 | 1 | 2;

/**
 * Prototope stroke util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const stroke = (value: StrokeWidth): Util => {
	return createUtil({ stroke: `${value}` });
};

export { stroke };
