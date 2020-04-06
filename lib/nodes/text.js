import { IsotopeNode } from "../node";
if (!IsotopeNode.prototype.text) {
    /**
     * Processes the provided Node's text child tree.
     *
     * @param node - Node to be processed.
     */
    const processText = (node) => {
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
        text(text) {
            this.clean();
            if (typeof text === "function") {
                this.textData = text;
                processText(this);
            }
            else {
                this.element.textContent = text;
            }
            return this;
        }
    });
}
//# sourceMappingURL=text.js.map