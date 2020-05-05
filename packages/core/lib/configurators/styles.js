import { IsotopeNode } from "../node";
if (!IsotopeNode.prototype.setStyles) {
    IsotopeNode.prototype.onCreate.push((node, config) => {
        if (config.styles) {
            if (typeof config.styles === "function") {
                node.styles = config.styles;
            }
            else {
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
        getStyle(property) {
            const { style } = this.element;
            return style ? style[property] : style;
        },
        /** @private */
        setStyle(property, value) {
            const { style } = this.element;
            if (style) {
                style[property] = `${value}${typeof value === "number" ? "px" : ""}`;
            }
            return this;
        },
        /** @private */
        setStyles(styles) {
            Object.entries(styles).forEach(([property, value]) => {
                this.setStyle(property, value);
            });
            return this;
        }
    });
}
//# sourceMappingURL=styles.js.map