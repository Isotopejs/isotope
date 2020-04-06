import { ConfigFunction, Indexable, StyleProperties } from "../declarations";
import { IsotopeNode } from "../node";

declare module "../node" {
	interface IsotopeNode<S extends Indexable = any, C extends Indexable = any> {
		styles?: ConfigFunction<S, C, StyleProperties>;
		/**
		 * Retrieves the value of the specified style property.
		 *
		 * @param property - Property to be retrieved.
		 * @returns - The retrieved value.
		 */
		getStyle<P extends keyof StyleProperties>(
			property: P
		): StyleProperties[P] | undefined;
		/**
		 * Sets the specified style property.
		 *
		 * @param property - Property to be set.
		 * @param value - Value to be assigned.
		 * @returns - IsotopeNode.
		 */
		setStyle<P extends keyof StyleProperties>(
			property: P,
			value: StyleProperties[P]
		): this;
		/**
		 * Sets multiple style properties.
		 *
		 * @param styles - Object with style properties to be set.
		 * @returns - IsotopeNode.
		 */
		setStyles(this: IsotopeNode, styles: StyleProperties): this;
	}
	interface IsotopeNodeConfig<S extends Indexable, C extends Indexable> {
		styles?: StyleProperties | ConfigFunction<S, C, StyleProperties>;
	}
}

if (!IsotopeNode.prototype.setStyles) {
	IsotopeNode.prototype.onCreate.push((node, config) => {
		if (config.styles) {
			if (typeof config.styles === "function") {
				node.styles = config.styles;
			} else {
				node.setStyles(config.styles);
			}
		}
	});
	IsotopeNode.prototype.onProcess.push((node) => {
		if (node.styles) {
			node.setStyles(node.styles(node));
		}
	});
	Object.assign(IsotopeNode.prototype, {
		/** @private */
		getStyle<P extends keyof StyleProperties>(
			this: IsotopeNode,
			property: P
		): StyleProperties[P] | undefined {
			const { style } = this.element;

			return style ? style[property] : style;
		},
		/** @private */
		setStyle<P extends keyof StyleProperties>(
			this: IsotopeNode,
			property: P,
			value: StyleProperties[P]
		): IsotopeNode {
			const { style } = this.element;

			if (style) {
				style[property] = `${value}${typeof value === "number" ? "px" : ""}` as any;
			}

			return this;
		},
		/** @private */
		setStyles(this: IsotopeNode, styles: StyleProperties): IsotopeNode {
			Object.entries(styles).forEach(
				([property, value]: [keyof StyleProperties, string | number]) => {
					this.setStyle(property, value);
				}
			);

			return this;
		}
	});
}
