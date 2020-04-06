import { ConfigFunction, Indexable } from "../declarations";
import { IsotopeNode } from "../node";

declare module "../node" {
	interface IsotopeNode<S extends Indexable = any, C extends Indexable = any> {
		classes?: ConfigFunction<S, C, string[] | Indexable<boolean>>;
		/**
		 * Applies the specified CSS class name to the Node's element.
		 *
		 * @param className - CSS class name to be applied.
		 * @returns - IsotopeNode.
		 */
		addClass(className: string): this;
		/**
		 * Checks if the Node's element contains the specified CSS class name.
		 *
		 * @param className - CSS class name to be checked.
		 * @returns - If the Node's element contains the specified CSS class name.
		 */
		hasClass(className: string): boolean;
		/**
		 * Removes the specified CSS class name from the Node's element.
		 *
		 * @param className - CSS class name to be removed.
		 * @returns - IsotopeNode.
		 */
		removeClass(className: string): this;
		/**
		 * Sets multiple CSS class names.
		 *
		 * @param classes - Object or array with CSS class name to be set.
		 * @returns - IsotopeNode.
		 */
		setClasses(classes: string[] | Indexable<boolean>): this;
	}
	interface IsotopeNodeConfig<S extends Indexable, C extends Indexable> {
		classes?:
			| string[]
			| Indexable<boolean>
			| ConfigFunction<S, C, Indexable<boolean> | string[]>;
	}
}

if (!IsotopeNode.prototype.setClasses) {
	IsotopeNode.prototype.onCreate.push((node, config) => {
		if (config.classes) {
			if (typeof config.classes === "function") {
				node.classes = config.classes;
			} else {
				node.setClasses(config.classes);
			}
		}
	});
	IsotopeNode.prototype.onProcess.push((node) => {
		if (node.classes) {
			node.setClasses(node.classes(node));
		}
	});
	Object.assign(IsotopeNode.prototype, {
		/** @private */
		addClass(this: IsotopeNode, className: string): IsotopeNode {
			this.element.classList.add(className);

			return this;
		},
		/** @private */
		hasClass(this: IsotopeNode, className: string): boolean {
			return this.element.classList.contains(className);
		},
		/** @private */
		removeClass(this: IsotopeNode, className: string): IsotopeNode {
			this.element.classList.remove(className);

			return this;
		},
		/** @private */
		setClasses(this: IsotopeNode, classes: string[] | Indexable<boolean>): IsotopeNode {
			if (Array.isArray(classes)) {
				classes.forEach((className) => this.addClass(className));
			} else {
				Object.entries(classes).forEach(([className, value]) => {
					if (value) {
						this.addClass(className);
					} else {
						this.removeClass(className);
					}
				});
			}

			return this;
		}
	});
}
