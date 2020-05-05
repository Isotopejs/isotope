import { Util } from "../../declarations";
import { createUtil } from "../util";

type Duration = 1000 | 700 | 500 | 300 | 200 | 150 | 100 | 75;

/**
 * Prototope transition-duration util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const duration = (value: Duration): Util => {
	return createUtil({ transitionDuration: `${value}ms` });
};

export { duration };
