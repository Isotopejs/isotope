import {
	Config,
	PartialConfig,
	PrototopeContext,
	PrototopeRegistry
} from "./declarations";
import { IsotopeNode } from "@isotope/core";
import { PrototopeDOMRegistry } from "./registry";
import { applyDefaultConfig } from "./config";

interface Prototope {
	node: IsotopeNode<any, PrototopeContext>;
	getCSS(): string;
}

/**
 * Prototope wrapper component.
 *
 * @param config - Prototope's config.
 * @param registry - Function creating custom implementation of PrototopeRegistry.
 * @returns - Prototope setup object.
 */
const Prototope = (
	config: PartialConfig = {},
	registry?: (config: Config) => PrototopeRegistry
) => (parent: IsotopeNode): Prototope => {
	const fullConfig = applyDefaultConfig(config);
	const node = parent.child<any, PrototopeContext>("div", {
		context: {
			prototope: {
				config: fullConfig,
				data: {},
				registry: registry ? registry(fullConfig) : new PrototopeDOMRegistry(fullConfig)
			}
		}
	});
	/**
	 * Retrieves Prototope's CSS stylesheet string.
	 *
	 * @returns - Prototope's CSS stylesheet string.
	 */
	const getCSS = (): string => {
		const prototope = node.getContext("prototope");

		if (prototope) {
			return prototope.registry.getCSS();
		}

		return "";
	};

	return {
		getCSS,
		node
	};
};

export { Prototope, PrototopeContext };
