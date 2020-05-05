import { IsotopeNode } from "./node";

interface IsotopeViewConfig {
	attach?: boolean;
	clean?: boolean;
}

/**
 * Creates a DOM View.
 *
 * @param element - Element to append to.
 * @param config - DOM View config.
 * @returns - The created top-level Node.
 */
const createDOMView = (element: Element, config?: IsotopeViewConfig): IsotopeNode => {
	if (IsotopeNode.prototype.customDOM) {
		IsotopeNode.prototype.customDOM = null;
	}

	if (!config || (config && config.clean && !config.attach)) {
		element.textContent = "";
	}

	return new IsotopeNode(element, config);
};

export { createDOMView };
