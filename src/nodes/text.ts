import { Indexable } from "../declarations";
import { IsotopeNode } from "../node";

type TextData<S extends Indexable, C extends Indexable> = (
	node: IsotopeNode<S, C>
) => string;

declare module "../node" {
	interface IsotopeNode<S extends Indexable = any, C extends Indexable = any> {
		textData?: TextData<S, C> | null;
		/**
		 * Sets the Node's element text.
		 *
		 * @param text - Text to be set.
		 * @returns - The Node.
		 */
		text(text: TextData<S, C> | string): this;
	}
}

if (!IsotopeNode.prototype.text) {
	/**
	 * Processes the provided Node's text child tree.
	 *
	 * @param node - Node to be processed.
	 */
	const processText = (node: IsotopeNode): void => {
		if (node.textData) {
			const data = node.textData(node);

			if (data !== node.element.textContent) {
				node.element.textContent = data;
			}
		}
	};

	IsotopeNode.prototype.onClean.push((node) => {
		if (node.textData) {
			node.textData = null;
		}
	});
	IsotopeNode.prototype.onProcess.push((node) => {
		if (node.textData) {
			processText(node);
		}
	});
	Object.assign(IsotopeNode.prototype, {
		/** @private */
		text(this: IsotopeNode, text: TextData<any, any> | string): IsotopeNode {
			this.clean();

			if (typeof text === "function") {
				this.textData = text;
				processText(this);
			} else {
				this.element.textContent = text;
			}

			return this;
		}
	});
}
