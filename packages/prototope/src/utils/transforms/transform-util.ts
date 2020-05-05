import { Util } from "../../declarations";
import { createUtil } from "../util";

interface TransformProperties {
	rotate?: string;
	scaleX?: string;
	scaleY?: string;
	skewX?: string;
	skewY?: string;
	translateX?: string;
	translateY?: string;
}

/**
 * Creates Prototope transform util.
 *
 * @param properties - Transform properties.
 * @returns - Prototope transform util.
 */
const createTransformUtil = (properties: TransformProperties): Util => {
	return createUtil((config, data, registry) => {
		let { transform = "" } = registry.getRule(data) || {};

		Object.entries(properties).forEach(([name, value]) => {
			if (transform.includes(name)) {
				const match = new RegExp(`${name}\\(.+?\\)`, "g");

				transform = transform.replace(match, `${name}(${value})`);
			} else {
				transform += ` ${name}(${value})`;
			}
		});

		return {
			transform: transform.trim()
		};
	});
};

export { createTransformUtil };
