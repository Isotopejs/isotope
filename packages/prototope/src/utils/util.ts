import { Config, Context, CurrentData, PrototopeRegistry } from "../declarations";
import { IsotopeNode } from "@isotope/core";
import { Properties } from "csstype";

type UtilConfig =
	| ((
			config: Config,
			data: CurrentData,
			registry: PrototopeRegistry
	  ) => Properties<string>)
	| Properties<string>;

/**
 * Creates Prototope utility directive.
 *
 * @param utilConfig - Utility configuration function.
 * @returns - Isotope directive.
 */
const createUtil = (utilConfig: UtilConfig) => {
	return (node: IsotopeNode<any, Context>) => {
		const { config, data, registry } = node.getContext("prototope") || {};

		if (config && data && registry) {
			const properties =
				typeof utilConfig === "object" ? utilConfig : utilConfig(config, data, registry);

			if (data.className && !node.hasClass(data.className)) {
				data.className = null;
			}

			data.className = registry.addRule(properties, data);

			if (!node.hasClass(data.className)) {
				node.addClass(data.className);
			}

			data.breakpoint = null;
			data.selector = null;
		}
	};
};

export { createUtil };
