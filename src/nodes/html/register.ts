import { IsotopeNode, IsotopeNodeConfig } from "../../node";
import { Indexable } from "../../declarations";

type Child = <S extends Indexable = any, C extends Indexable = any>(
	config?: IsotopeNodeConfig<S, C> | string
) => IsotopeNode<S, C>;

/**
 * Registers new Node child function.
 *
 * @param name - Name for the child.
 */
const registerChild = (name: string): void => {
	/** @private */
	if (!IsotopeNode.prototype[name as keyof typeof IsotopeNode.prototype]) {
		IsotopeNode.prototype[name as keyof typeof IsotopeNode.prototype] = function(
			this: IsotopeNode,
			config?: IsotopeNodeConfig<any, any> | string
		) {
			return this.child(name, config);
		};
	}
};

export { Child, registerChild };
