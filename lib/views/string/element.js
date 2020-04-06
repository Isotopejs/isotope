/**
 * Class implementing Isotope CustomElement API, allowing for easy server-side stringification.
 */
class StringElement {
    /**
     * Creates a new ServerElement instance.
     *
     * @param tag - Tag to be used for the element.
     */
    constructor(tag) {
        this.children = [];
        this.classList = {
            add: (...tokens) => {
                this.classes.push(...tokens);
            },
            contains: (token) => {
                return this.classes.includes(token);
            },
            remove: (...tokens) => {
                tokens.forEach((token) => {
                    this.classes.splice(this.classes.indexOf(token), 1);
                });
            }
        };
        this.parentElement = null;
        this.style = {};
        this.attributes = {};
        this.classes = [];
        this.$textContent = "";
        this.events = {};
        this.tagName = tag;
    }
    /** @private */
    addEventListener(type, listener) {
        (this.events[type] || (this.events[type] = [])).push(listener);
    }
    /** @private */
    appendChild(newChild) {
        this.children.push(newChild);
        newChild.parentElement = this;
        return newChild;
    }
    /** @private */
    dispatchEvent(event) {
        (this.events[event.type] || []).slice().forEach((handler) => {
            if (typeof handler === "function") {
                handler(event);
            }
            else {
                handler.handleEvent(event);
            }
        });
        return true;
    }
    /** @private */
    getAttribute(qualifiedName) {
        return this.attributes[qualifiedName];
    }
    /** @private */
    insertBefore(newChild, refChild) {
        newChild.parentElement = this;
        if (refChild) {
            const index = this.children.indexOf(refChild);
            if (index >= 0) {
                this.children.splice(index + 1, 0, newChild);
                return newChild;
            }
        }
        this.children.push(newChild);
        return newChild;
    }
    /** @private */
    removeAttribute(qualifiedName) {
        this.attributes[qualifiedName] = null;
    }
    /** @private */
    removeChild(oldChild) {
        oldChild.parentElement = null;
        this.children.splice(this.children.indexOf(oldChild), 1);
        return oldChild;
    }
    /** @private */
    removeEventListener(type, listener) {
        if (this.events[type]) {
            this.events[type].splice(this.events[type].indexOf(listener) >>> 0, 1);
        }
    }
    /** @private */
    setAttribute(qualifiedName, value) {
        this.attributes[qualifiedName] = value;
    }
    /** @private */
    set textContent(textContent) {
        this.children = [];
        this.$textContent = textContent || "";
    }
    /** @private */
    get textContent() {
        return this.$textContent;
    }
    /**
     * Stringifies the ServerElement.
     *
     * @returns - Stringified ServerElement.
     */
    toString() {
        const tag = this.tagName;
        const content = this.textContent ||
            this.children
                .map((child) => {
                return `${child}`;
            })
                .join("");
        const classes = this.classes.join(" ");
        const styles = Object.entries(this.style)
            .map(([property, value]) => {
            const propertyKebabCase = property.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
            return `${propertyKebabCase}:${value}`;
        })
            .join(";");
        const attributes = Object.entries(this.attributes)
            .map(([name, value]) => {
            return `${name}="${value}"`;
        })
            .join(" ");
        return `<${tag}${classes ? ` class="${classes}"` : ""}${styles ? `style="${styles}"` : ""}${attributes}>${content}</${tag}>`;
    }
}
export { StringElement };
//# sourceMappingURL=element.js.map