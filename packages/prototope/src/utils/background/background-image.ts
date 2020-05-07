import { Util } from "../../declarations";
import { createUtil } from "../util";

const bgGradient = createUtil(({ colors }) => ({
	backgroundImage: `linear-gradient(45deg,${colors.primary},${colors.secondary})`
}));
/**
 * Prototope background-image util.
 *
 * @param url - Background image URL.
 * @returns - Prototope util.
 */
const bgUrl = (url: string): Util => {
	return createUtil({
		backgroundImage: `url("${url}")`
	});
};

export { bgGradient, bgUrl };
