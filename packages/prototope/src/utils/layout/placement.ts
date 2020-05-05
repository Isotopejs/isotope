import { Properties } from "csstype";
import { createUtil } from "../util";

/**
 * Create Prototope placement util.
 *
 * @param properties - CSS Properties returning function.
 * @returns - Prototope placement util.
 */
const placement = (properties: (value: string) => Properties<string>) => {
	return (value: 0 | "auto" = "auto") => {
		return createUtil(properties(typeof value === "number" ? `${value}px` : value));
	};
};
const inset = placement((value) => ({
	bottom: value,
	left: value,
	right: value,
	top: value
}));
const insetY = placement((value) => ({
	bottom: value,
	top: value
}));
const insetX = placement((value) => ({
	left: value,
	right: value
}));
const bottom = placement((bottom) => ({ bottom }));
const top = placement((top) => ({ top }));
const left = placement((left) => ({ left }));
const right = placement((right) => ({ right }));

export { inset, insetY, insetX, bottom, top, left, right };
