import { IsotopeNode } from "../node";
if (!IsotopeNode.prototype.setAttribs) {
    IsotopeNode.prototype.onCreate.push((node, config) => {
        if (config.attribs) {
            if (typeof config.attribs === "function") {
                node.attribs = config.attribs;
            }
            else {
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
        getAttrib(attrib) {
            const value = this.element.getAttribute(attrib);
            return value === "" ? true : value;
        },
        /** @private */
        setAttrib(attrib, value) {
            if (value) {
                this.element.setAttribute(attrib, value === true ? "" : value);
            }
            else {
                this.element.removeAttribute(attrib);
            }
            return this;
        },
        /** @private */
        setAttribs(attribs) {
            Object.entries(attribs).forEach(([attrib, value]) => {
                this.setAttrib(attrib, value);
            });
            return this;
        }
    });
}
//# sourceMappingURL=attribs.js.map