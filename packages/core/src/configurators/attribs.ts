import { ConfigFunction, Indexable } from "../declarations";
import { IsotopeNode } from "../node";

declare module "../node" {
	interface IsotopeNode<S extends Indexable = any, C extends Indexable = any> {
		attribs?: ConfigFunction<S, C, Indexable<string | boolean>>;
		/**
		 * Retrieves the value of the specified attribute.
		 *
		 * @param attrib - Attribute to be retrieved.
		 * @returns - The retrieved value.
		 */
		getAttrib(attrib: string): string | boolean | null;
		/**
		 * Sets the value of the specified attribute.
		 *
		 * @param attrib - Attribute to be set.
		 * @param value - Value to assigned.
		 * @returns - IsotopeNode.
		 */
		setAttrib(attrib: string, value?: string | boolean): this;
		/**
		 * Sets multiple attributes.
		 *
		 * @param attribs - Object with key-value pairs of attributes and their values.
		 * @returns - IsotopeNode.
		 */
		setAttribs(attribs: Indexable): this;
	}
	interface IsotopeNodeConfig<S extends Indexable, C extends Indexable> {
		attribs?: Indexable | ConfigFunction<S, C, Indexable>;
	}
}

if (!IsotopeNode.prototype.setAttribs) {
	IsotopeNode.prototype.onCreate.push((node, config) => {
		if (config.attribs) {
			if (typeof config.attribs === "function") {
				node.attribs = config.attribs as ConfigFunction<
					any,
					any,
					Indexable<string | boolean>
				>;
			} else {
				node.setAttribs(config.attribs);
			}
		}
	});
	IsotopeNode.prototype.onProcess.push((node) => {
		if (node.attribs) {
			node.setAttribs(node.attribs(node));
		}
	});
	Object.assign(IsotopeNode.prototype, {
		/** @private */
		getAttrib(this: IsotopeNode, attrib: string): string | boolean | null {
			const value = this.element.getAttribute(attrib);

			return value === "" ? true : value;
		},
		/** @private */
		setAttrib(this: IsotopeNode, attrib: string, value?: string | boolean): IsotopeNode {
			if (value) {
				this.element.setAttribute(attrib, value === true ? "" : value);
			} else {
				this.element.removeAttribute(attrib);
			}

			return this;
		},

		/** @private */
		setAttribs(this: IsotopeNode, attribs: Indexable): IsotopeNode {
			Object.entries(attribs).forEach(([attrib, value]) => {
				this.setAttrib(attrib, value);
			});

			return this;
		}
	});
}
