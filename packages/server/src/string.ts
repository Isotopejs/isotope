import { CustomEvent } from "@isotope/core/src/declarations";
import { IsotopeNode } from "@isotope/core";
import { StringElement } from "./element";

/**
 * Creates a String View.
 *
 * @param tag - Tag for the top-level Node.
 * @returns - The created top-level Node.
 */
const createStringView = (tag: string): IsotopeNode => {
	if (!IsotopeNode.prototype.customDOM) {
		IsotopeNode.prototype.customDOM = {
			/** @private */
			createElement(tag: string): StringElement {
				return new StringElement(tag);
			},
			/** @private */
			createEvent(type: string): CustomEvent {
				return { type };
			}
		};
	}

	return new IsotopeNode(tag);
};

export { createStringView };
