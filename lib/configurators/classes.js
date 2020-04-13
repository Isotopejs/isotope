import { IsotopeNode } from "../node";
if (!IsotopeNode.prototype.setClasses) {
    IsotopeNode.prototype.onCreate.push((node, config) => {
        if (config.classes) {
            let classes = "";
            if (typeof config.classes === "function") {
                node.classes = config.classes;
            }
            else if (Array.isArray(config.classes)) {
                classes = config.classes.join(" ");
            }
            else {
                classes = Object.entries(config.classes)
                    .filter(([, apply]) => apply)
                    .map(([name]) => name)
                    .join(" ");
            }
            if (classes) {
                node.element.setAttribute("class", classes);
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