import { Indexable } from "../declarations";
import { IsotopeNode } from "../node";

interface ConditionalData<S extends Indexable, C extends Indexable> {
	previous?: boolean;
	condition: keyof S | ((node: IsotopeNode<S, C>) => boolean);
	onTrue(node: IsotopeNode<S, C>): IsotopeNode | void;
	onFalse?(node: IsotopeNode<S, C>): IsotopeNode | void;
}

declare module "../node" {
	interface IsotopeNode<S extends Indexable = any, C extends Indexable = any> {
		conditionalData?: ConditionalData<S, C> | null;
		/**
		 * Conditionally renders the provided nodes.
		 *
		 * @param condition - Condition to be checked.
		 * @param onTrue - Rendering function to be executed when condition is truthy.
		 * @param onFalse - Rendering function to be executed when condition is falsy.
		 * @returns - The Node.
		 */
		if(
			condition: boolean | keyof S | ((node: this) => boolean),
			onTrue: (node: this) => IsotopeNode | void,
			onFalse?: (node: this) => IsotopeNode | void
		): this;
	}
}

if (!IsotopeNode.prototype.if) {
	/**
	 * Processes the provided Node's conditional child tree.
	 *
	 * @param node - Node to be processed.
	 */
	const processConditional = (node: IsotopeNode): void => {
		if (node.conditionalData) {
			const data = node.conditionalData;
			const { condition } = data;
			const processedCondition = Boolean(
				typeof condition === "function" ? condition(node) : node.getState(condition)
			);

			if (processedCondition !== data.previous) {
				node.element.textContent = "";
				node.linked = null;

				if (processedCondition) {
					data.onTrue(node);
				} else if (data.onFalse) {
					data.onFalse(node);
				}

				data.previous = processedCondition;
			}
		}
	};

	IsotopeNode.prototype.onClean.push((node) => {
		if (node.conditionalData) {
			node.conditionalData = null;
		}
	});
	IsotopeNode.prototype.onProcess.push((node) => {
		if (node.conditionalData) {
			processConditional(node);
		}
	});
	Object.assign(IsotopeNode.prototype, {
		/** @private */
		if(
			this: IsotopeNode,
			condition: boolean | string | ((node: IsotopeNode) => boolean),
			onTrue: (node: IsotopeNode) => IsotopeNode | void,
			onFalse?: (node: IsotopeNode) => IsotopeNode | void
		): IsotopeNode {
			this.clean();

			if (typeof condition === "boolean") {
				if (condition) {
					onTrue(this);
				} else if (onFalse) {
					onFalse(this);
				}
			} else {
				this.conditionalData = {
					condition,
					onFalse,
					onTrue
				};
				processConditional(this);
			}

			return this;
		}
	});
}
