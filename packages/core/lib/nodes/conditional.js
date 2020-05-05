import { IsotopeNode } from "../node";
if (!IsotopeNode.prototype.if) {
    /**
     * Processes the provided Node's conditional child tree.
     *
     * @param node - Node to be processed.
     */
    const processConditional = (node) => {
        if (node.conditionalData) {
            const data = node.conditionalData;
            const { condition } = data;
            const processedCondition = Boolean(typeof condition === "function" ? condition(node) : node.getState(condition));
            if (processedCondition !== data.previous) {
                node.element.textContent = "";
                node.linked = null;
                if (processedCondition) {
                    data.onTrue(node);
                }
                else if (data.onFalse) {
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
        if(condition, onTrue, onFalse) {
            this.clean();
            if (typeof condition === "boolean") {
                if (condition) {
                    onTrue(this);
                }
                else if (onFalse) {
                    onFalse(this);
                }
            }
            else {
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
//# sourceMappingURL=conditional.js.map