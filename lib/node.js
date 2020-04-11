/**
 * Class representing a Node.
 */
class IsotopeNode {
    /**
     * Creates a new Node.
     *
     * @param element -  The Node's HTML element or tag.
     * @param config - The Node's configuration.
     */
    constructor(element, config) {
        this.element = this.getElement(element, config);
        if (typeof config === "string") {
            this.element.textContent = config;
        }
        else if (typeof config === "object" && !Array.isArray(config)) {
            if (config.attach) {
                this.childIndex = 0;
            }
            if (config.autoLink) {
                this.autoLink = config.autoLink;
            }
            if (config.state) {
                this.state = config.state;
            }
            if (config.context) {
                this.context = config.context;
            }
            this.onCreate.forEach((callback) => {
                callback(this, config);
            });
        }
        else if (config) {
            this.$(config);
        }
        this.process();
    }
    /**
     * Executes the provided directive(s).
     *
     * @param directives - Directive(s) to be executed.
     * @returns - The Node or the return value of the directive.
     */
    $(directives) {
        if (Array.isArray(directives)) {
            directives.forEach((directive) => {
                directive(this);
            });
        }
        else {
            const value = directives(this);
            if (typeof value !== "undefined") {
                return value;
            }
        }
        return this;
    }
    /**
     * Adds a child Node to the Node.
     *
     * @param tag - Child Node's HTML tag.
     * @param config - Child Node's configuration.
     * @returns - The created child Node.
     */
    child(tag, config) {
        const shouldAttach = typeof this.childIndex !== "undefined";
        let element = tag;
        if (shouldAttach) {
            const attachTarget = this.element.children[this.childIndex || 0];
            if (attachTarget) {
                element = attachTarget;
                this.childIndex = (this.childIndex || 0) + 1;
            }
        }
        const node = new IsotopeNode(element, config);
        this.element.appendChild(node.element);
        if (shouldAttach && !node.childIndex) {
            node.childIndex = 0;
        }
        if (this.context) {
            if (node.context) {
                node.context = Object.assign(node.context, this.context);
            }
            else {
                node.context = this.context;
            }
        }
        if (this.autoLink) {
            this.link(node);
        }
        return node;
    }
    /**
     * Cleans the Node's child tree.
     *
     * @returns - IsotopeNode.
     */
    clean() {
        if (this.linked) {
            this.linked = null;
        }
        this.onClean.forEach((callback) => {
            callback(this);
        });
        this.element.textContent = "";
        return this;
    }
    /**
     * Emits the specified event.
     *
     * @param event - Event to be emitted.
     * @param data - Data to be passed to the listening function.
     * @returns - IsotopeNode.
     */
    emit(event, data = {}) {
        this.element.dispatchEvent(Object.assign(this.customDOM ? this.customDOM.createEvent(event) : new Event(event), { node: this }, data));
        return this;
    }
    /**
     * Retrieves the data from the Node's context.
     *
     * @param key - Data key to be retrieved.
     * @returns - The retrieved data.
     */
    getContext(key) {
        return this.context ? this.context[key] : null;
    }
    /**
     * Retrieves the data from the Node's state.
     *
     * @param key - Data key to be retrieved.
     * @returns - The retrieved data.
     */
    getState(key) {
        return this.state ? this.state[key] : null;
    }
    /**
     * Links the provided Node.
     *
     * @param node - Node to be linked.
     * @param position - Position to place Node at in the linked array.
     * @returns - IsotopeNode.
     */
    link(node, position) {
        const nodeLinkup = node.linkup;
        if (nodeLinkup !== this) {
            if (nodeLinkup && nodeLinkup.linked) {
                nodeLinkup.linked.splice(nodeLinkup.linked.indexOf(node), 1);
            }
            if (!this.linked) {
                this.linked = [];
            }
            if (position) {
                this.linked.splice(position, 0, node);
            }
            else {
                this.linked.push(node);
            }
            node.linkup = this;
        }
        return this;
    }
    /**
     * Moves the linked Node to the provided position.
     *
     * @param position - Position index to move the Node to.
     * @returns - IsotopeNode.
     */
    move(position) {
        const { linkup } = this;
        if (linkup && linkup.linked) {
            const upperLinked = linkup.linked;
            const [node] = upperLinked.splice(upperLinked.indexOf(this), 1);
            upperLinked.splice(position, 0, node);
            const referenceNode = upperLinked[position + 1];
            linkup.element.insertBefore(this.element, referenceNode ? referenceNode.element : null);
        }
        return this;
    }
    /** @private */
    off(event, handler, options) {
        this.element.removeEventListener(event, handler, options);
        return this;
    }
    /** @private */
    on(event, handler, options) {
        this.element.addEventListener(event, handler, options);
        return this;
    }
    /**
     * Removes the Node.
     *
     * @returns - IsotopeNode.
     */
    remove() {
        const { linkup } = this;
        if (linkup && linkup.linked) {
            linkup.linked.splice(linkup.linked.indexOf(this), 1);
        }
        if (this.linked) {
            this.linked = null;
        }
        if (this.element.parentElement) {
            this.element.parentElement.removeChild(this.element);
        }
        this.emit("node-removed");
        return this;
    }
    /**
     * Sets the Node's state.
     *
     * @param state - State object to be set.
     * @returns - IsotopeNode.
     */
    setState(state) {
        if (this.state) {
            Object.assign(this.state, state);
            this.emit("state-changed");
            this.process();
        }
        return this;
    }
    /**
     * Stringifies Node's element.
     *
     * @returns - Stringified Node's element.
     */
    toString() {
        return `${this.element}`;
    }
    /**
     * Retrieves the proper element from Node's configuration.
     *
     * @param element -  The Node's element or tag.
     * @param config - The Node's configuration.
     * @returns - Retrieved element.
     */
    getElement(element, config) {
        if (typeof element === "string") {
            if (typeof config === "object" && !Array.isArray(config) && config.namespace) {
                if (this.customDOM) {
                    return this.customDOM.createElement(element, config.namespace);
                }
                return document.createElementNS(config.namespace, element);
            }
            else if (this.customDOM) {
                return this.customDOM.createElement(element);
            }
            return document.createElement(element);
        }
        return element;
    }
    /**
     * Processes and renders the Node.
     */
    process() {
        this.emit("node-updated");
        this.onProcess.forEach((callback) => {
            callback(this);
        });
        if (this.linked) {
            this.linked.forEach((linked) => {
                linked.process();
            });
        }
    }
}
Object.assign(IsotopeNode.prototype, {
    onClean: [],
    onCreate: [],
    onProcess: []
});
export { IsotopeNode };
//# sourceMappingURL=node.js.map