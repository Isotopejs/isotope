import { IsotopeNode, IsotopeNodeConfig } from "../src/node";
import { Indexable } from "../src/declarations";

/** @private */
const createIsotopeNode = <S extends Indexable, C extends Indexable>(
	config?: IsotopeNodeConfig<S, C>
): IsotopeNode<S, C> => {
	return new IsotopeNode<S, C>("div", config);
};

export { createIsotopeNode };
