import { PrototopeContext, Util } from "./declarations";
import { IsotopeNode } from "@isotope/core";

/**
 * Creates Prototope sub-selector directive.
 *
 * @param subSelector - CSS sub-selector.
 * @returns - Isotope directive.
 */
const createSubSelector = (subSelector: string) => (utils: Util | Util[]) => {
	return (node: IsotopeNode<any, PrototopeContext>) => {
		const { data = {} } = node.getContext("prototope") || {};

		if (typeof utils === "function") {
			data.subSelector = subSelector;
			utils(node);
		} else {
			utils.forEach((util) => {
				data.subSelector = subSelector;
				util(node);
			});
		}
	};
};
const first = createSubSelector("first-child");
const last = createSubSelector("last-child");
const after = createSubSelector(":after");
const before = createSubSelector(":before");
const odd = createSubSelector("nth-child(odd)");
const even = createSubSelector("nth-child(even)");
const hover = createSubSelector("hover");
const focus = createSubSelector("focus");
const active = createSubSelector("active");
const visited = createSubSelector("visited");
const disabled = createSubSelector("disabled");
const placeholder = createSubSelector(":placeholder");

export {
	createSubSelector,
	first,
	last,
	after,
	before,
	odd,
	even,
	hover,
	focus,
	active,
	visited,
	disabled,
	placeholder
};
