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
                this.$classes.push(...tokens);
            },
            contains: (token) => {
                return this.$classes.includes(token);
            },
            remove: (...tokens) => {
                tokens.forEach((token) => {
                    this.$classes.splice(this.$classes.indexOf(token), 1);
                });
            }
        };
        this.parentElement = null;
        this.style = {};
        this.$attributes = {};
        this.$classes = [];
        this.$textContent = "";
        this.$events = {};
        this.tagName = tag.toUpperCase();
    }
    /** @private */
    addEventListener(type, listener) {
        (this.$events[type] || (this.$events[type] = [])).push(listener);
    }
    /** @private */
    appendChild(newChild) {
        this.children.push(newChild);
        newChild.parentElement = this;
        return newChild;
    }
    /** @private */
    dispatchEvent(event) {
        (this.$events[event.type] || []).slice().forEach((handler) => {
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
        if (qualifiedName === "style") {
            return Object.entries(this.style)
                .map(([name, value]) => {
                return `${name.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)}: ${value}; `;
            })
                .join("")
                .trim();
        }
        else if (qualifiedName === "class") {
            return this.$classes.join(" ");
        }
        return this.$attributes[qualifiedName];
    }
    /** @private */
    insertBefore(newChild, refChild) {
        newChild.parentElement = this;
        if (refChild) {
            const index = this.children.indexOf(refChild);
            if (index >= 0) {
                this.children.splice(index, 0, newChild);
                return newChild;
            }
        }
        this.children.push(newChild);
        return newChild;
    }
    /** @private */
    removeAttribute(qualifiedName) {
        if (qualifiedName === "style") {
            this.style = {};
        }
        else if (qualifiedName === "class") {
            this.$classes = [];
        }
        else {
            this.$attributes[qualifiedName] = null;
        }
    }
    /** @private */
    removeChild(oldChild) {
        oldChild.parentElement = null;
        this.children.splice(this.children.indexOf(oldChild), 1);
        return oldChild;
    }
    /** @private */
    removeEventListener(type, listener) {
        if (this.$events[type]) {
            this.$events[type].splice(this.$events[type].indexOf(listener) >>> 0, 1);
        }
    }
    /** @private */
    setAttribute(qualifiedName, value) {
        if (qualifiedName === "style") {
            value.split(";").forEach((property) => {
                const [name, value] = property.split(":");
                if (name && value) {
                    const parsedName = name
                        .replace(/-([a-z])/g, (match) => match[1].toUpperCase())
                        .trim();
                    this.style[parsedName] = value.trim();
                }
            });
        }
        else if (qualifiedName === "class") {
            this.$classes = value.split(" ");
        }
        else {
            this.$attributes[qualifiedName] = value;
        }
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
        const tag = this.tagName.toLowerCase();
        const content = this.textContent ||
            this.children
                .map((child) => {
                return `${child}`;
            })
                .join("");
        const classes = this.getAttribute("class");
        const styles = this.getAttribute("style");
        const attribs = Object.entries(this.$attributes)
            .map(([name, value]) => {
            return `${name}="${value}"`;
        })
            .join(" ");
        return `<${tag}${classes ? ` class="${classes}"` : ""}${styles ? ` style="${styles}"` : ""}${attribs ? ` ${attribs}` : ""}>${content}</${tag}>`;
    }
}
export { StringElement };
//# sourceMappingURL=element.js.map