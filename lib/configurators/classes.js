import { IsotopeNode } from "../node";
if (!IsotopeNode.prototype.setClasses) {
    IsotopeNode.prototype.onCreate.push((node, config) => {
        if (config.classes) {
            if (typeof config.classes === "function") {
                node.classes = config.classes;
            }
            else {
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
        addClass(className) {
            this.element.classList.add(className);
            return this;
        },
        /** @private */
        hasClass(className) {
            return this.element.classList.contains(className);
        },
        /** @private */
        removeClass(className) {
            this.element.classList.remove(className);
            return this;
        },
        /** @private */
        setClasses(classes) {
            if (Array.isArray(classes)) {
                classes.forEach((className) => this.addClass(className));
            }
            else {
                Object.entries(classes).forEach(([className, value]) => {
                    if (value) {
                        this.addClass(className);
                    }
                    else {
                        this.removeClass(className);
                    }
                });
            }
            return this;
        }
    });
}
//# sourceMappingURL=classes.js.map