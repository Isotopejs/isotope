/*!
 * @isotope/core v0.1.4
 * (c) Arek Nawo <areknawo@areknawo.com> (areknawo.com)
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.Isotope = {}));
}(this, (function (exports) { 'use strict';

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

	/**
	 * Creates a DOM View.
	 *
	 * @param element - Element to append to.
	 * @param config - DOM View config.
	 * @returns - The created top-level Node.
	 */
	const createDOMView = (element, config) => {
	    if (IsotopeNode.prototype.customDOM) {
	        IsotopeNode.prototype.customDOM = null;
	    }
	    if (!config || (config && config.clean && !config.attach)) {
	        element.textContent = "";
	    }
	    return new IsotopeNode(element, config);
	};

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

	/**
	 * Creates a String View.
	 *
	 * @param tag - Tag for the top-level Node.
	 * @returns - The created top-level Node.
	 */
	const createStringView = (tag) => {
	    if (!IsotopeNode.prototype.customDOM) {
	        IsotopeNode.prototype.customDOM = {
	            /** @private */
	            createElement(tag) {
	                return new StringElement(tag);
	            },
	            /** @private */
	            createEvent(type) {
	                return { type };
	            }
	        };
	    }
	    return new IsotopeNode(tag);
	};

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

	/**
	 * Creates the Diffing loop data object.
	 *
	 * @param sourceInput - Original, source Item array.
	 * @param targetInput - Target Item array.
	 * @returns - Diffing loop data object.
	 */
	const createData = (sourceInput, targetInput) => ({
	    changes: [],
	    index: 0,
	    source: sourceInput.map((item) => `${typeof item === "object" ? item.id : item}`),
	    sourceInput,
	    target: targetInput.map((item) => `${typeof item === "object" ? item.id : item}`),
	    targetInput
	});
	/**
	 * Checks if the diffing loop should be run.
	 *
	 * @param data - Diffing loop data.
	 * @returns - If the diffing loop should be run.
	 */
	const shouldLoop = ({ index, source, target }) => {
	    return (source.length > 0 &&
	        target.length > 0 &&
	        (index <= source.length || index <= target.length));
	};
	/**
	 * Trims the diffed arrays from both sides if edge items are equal.
	 *
	 * @param data - Diffing loop data.
	 * @returns - If arrays were trimmed.
	 */
	const trim = ({ source, target }) => {
	    const [sourceStart] = source;
	    const sourceEnd = source[source.length - 1];
	    const [targetStart] = target;
	    const targetEnd = target[target.length - 1];
	    let trimmed = false;
	    if (sourceStart === targetStart) {
	        source.shift();
	        target.shift();
	        trimmed = true;
	    }
	    if (sourceEnd === targetEnd) {
	        source.pop();
	        target.pop();
	        trimmed = true;
	    }
	    return trimmed;
	};
	/**
	 * Detect whether the items should be moved to the opposite site of the array.
	 *
	 * @param data - Diffing loop data.
	 * @returns - Which item should be moved to left and which to right.
	 */
	const prepareMove = ({ index, source, target }) => {
	    const sourceStart = source[index];
	    const sourceEnd = source[source.length - 1 - index];
	    const [targetStart] = target;
	    const targetEnd = target[target.length - 1];
	    const moveLeft = sourceEnd === targetStart;
	    const moveRight = sourceStart === targetEnd;
	    const itemToLeft = moveLeft ? source.splice(source.length - 1 - index, 1)[0] : null;
	    const itemToRight = moveRight ? source.splice(index, 1)[0] : null;
	    return {
	        left: itemToLeft,
	        right: itemToRight
	    };
	};
	/**
	 * Move the specified items to the opposite site of the array.
	 *
	 * @param data - Diffing loop data.
	 * @param itemToLeft - Item to be moved to the left end.
	 * @param itemToRight - Item to be moved to the right end.
	 */
	const move = ({ changes, source }, itemToLeft, itemToRight) => {
	    if (itemToRight !== null) {
	        source.push(itemToRight);
	        changes.push({
	            id: itemToRight,
	            type: "move"
	        });
	    }
	    if (itemToLeft !== null) {
	        source.splice(0, 0, itemToLeft);
	        changes.push({
	            id: itemToLeft,
	            type: "move"
	        });
	    }
	};
	/**
	 * Adds the new items from diffed arrays.
	 *
	 * @param data - Diffing loop data.
	 */
	const add = ({ changes, target }) => {
	    target.splice(0).forEach((id) => {
	        changes.push({
	            id,
	            type: "add"
	        });
	    });
	};
	/**
	 * Removes the previous items from diffed arrays.
	 *
	 * @param data - Diffing loop data.
	 */
	const remove = ({ changes, source }) => {
	    source.splice(0).forEach((id) => {
	        changes.push({
	            id,
	            type: "remove"
	        });
	    });
	};
	/**
	 * Fills the remaining data required by specific changes.
	 *
	 * @param data - Diffing loop data.
	 */
	const fill = ({ changes, targetInput }) => {
	    changes.forEach((change) => {
	        const id = `${change.id}`;
	        const { type } = change;
	        if (type === "add" || type === "move") {
	            const index = targetInput.findIndex((item) => {
	                return typeof item === "object" ? `${item.id}` === id : `${item}` === id;
	            });
	            if (type === "add") {
	                change.item = targetInput[index];
	            }
	            change.position = index;
	        }
	    });
	};
	/**
	 * Detects changes made between 2 Item arrays.
	 *
	 * @param sourceInput - Original, source Item array.
	 * @param targetInput - Target Item array.
	 * @returns - Changes that differ the second array from the first one.
	 */
	const detectChanges = (sourceInput, targetInput) => {
	    const data = createData(sourceInput, targetInput);
	    while (shouldLoop(data)) {
	        if (trim(data)) {
	            data.index = 0;
	            continue;
	        }
	        const { left, right } = prepareMove(data);
	        if (left !== null || right !== null) {
	            move(data, left, right);
	            data.index = 0;
	        }
	        else {
	            data.index += 1;
	        }
	    }
	    add(data);
	    remove(data);
	    fill(data);
	    return data.changes;
	};

	if (!IsotopeNode.prototype.map) {
	    /**
	     * Handles Nodes map update.
	     *
	     * @param node - The parent Node.
	     * @param items - New items to be mapped.
	     */
	    const handleMapUpdate = (node, items) => {
	        const data = node.mapData;
	        const changes = detectChanges(node.linked || [], items);
	        changes.forEach(({ id, item, position = 0, type }, index) => {
	            if (type === "add") {
	                const child = data.createItem(item, node, index);
	                if (child) {
	                    child.id = `${id}`;
	                    node.link(child, position);
	                    child.move(position);
	                }
	            }
	            else {
	                const child = node.linked.find((linked) => linked.id === id);
	                if (child) {
	                    if (type === "remove") {
	                        child.remove();
	                    }
	                    else {
	                        child.move(position);
	                    }
	                }
	            }
	        });
	    };
	    /**
	     * Handles the Nodes map creation.
	     *
	     * @param node - The parent Node.
	     * @param items - Items to be mapped.
	     */
	    const handleMapCreation = (node, items) => {
	        const data = node.mapData;
	        items.forEach((item, index) => {
	            const child = data.createItem(item, node, index);
	            if (child) {
	                child.id = `${typeof item === "object" ? item.id : item}`;
	                node.link(child);
	            }
	        });
	    };
	    /**
	     * Processes the provided Node's map child tree.
	     *
	     * @param node - Node to be processed.
	     */
	    const processMap = (node) => {
	        if (node.mapData) {
	            const data = node.mapData;
	            const items = typeof data.items === "function" ? data.items(node) : node.getState(data.items);
	            if (node.linked) {
	                handleMapUpdate(node, items);
	            }
	            else {
	                handleMapCreation(node, items);
	            }
	        }
	    };
	    IsotopeNode.prototype.onClean.push((node) => {
	        if (node.mapData) {
	            node.mapData = null;
	        }
	    });
	    IsotopeNode.prototype.onProcess.push((node) => {
	        if (node.mapData) {
	            processMap(node);
	        }
	    });
	    Object.assign(IsotopeNode.prototype, {
	        /** @private */
	        map(items, createItem) {
	            this.clean();
	            if (Array.isArray(items)) {
	                items.forEach((item, index) => {
	                    createItem(item, this, index);
	                });
	            }
	            else {
	                this.mapData = {
	                    createItem,
	                    items
	                };
	                processMap(this);
	            }
	            return this;
	        }
	    });
	}

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

	/**
	 * Registers new Node child function.
	 *
	 * @param name - Name for the child.
	 */
	const registerChild = (name) => {
	    /** @private */
	    if (!IsotopeNode.prototype[name]) {
	        IsotopeNode.prototype[name] = function (config) {
	            return this.child(name, config);
	        };
	    }
	};

	const nodes = [
	    "blockquote",
	    "dd",
	    "div",
	    "dl",
	    "dt",
	    "figcaption",
	    "figure",
	    "hr",
	    "li",
	    "main",
	    "ol",
	    "p",
	    "pre",
	    "ul"
	];
	nodes.forEach((name) => {
	    registerChild(name);
	});

	const nodes$1 = ["embed", "iframe", "object", "param", "picture", "source"];
	nodes$1.forEach((name) => {
	    registerChild(name);
	});

	const nodes$2 = [
	    "button",
	    "datalist",
	    "fieldset",
	    "form",
	    "input",
	    "label",
	    "legend",
	    "meter",
	    "optgroup",
	    "option",
	    "output",
	    "progress",
	    "select",
	    "textarea"
	];
	nodes$2.forEach((name) => {
	    registerChild(name);
	});

	const nodes$3 = [
	    "details",
	    "dialog",
	    "menu",
	    "summary",
	    "canvas",
	    "script",
	    "noscript",
	    "slot",
	    "template"
	];
	nodes$3.forEach((name) => {
	    registerChild(name);
	});

	const nodes$4 = ["area", "audio", "img", "track", "video"];
	nodes$4.forEach((name) => {
	    registerChild(name);
	});

	const nodes$5 = [
	    "address",
	    "article",
	    "aside",
	    "footer",
	    "header",
	    "h1",
	    "h2",
	    "h3",
	    "h4",
	    "h5",
	    "h6",
	    "hgroup",
	    "main",
	    "nav",
	    "section"
	];
	nodes$5.forEach((name) => {
	    registerChild(name);
	});

	const nodes$6 = [
	    "caption",
	    "col",
	    "colgroup",
	    "table",
	    "tbody",
	    "td",
	    "tfoot",
	    "th",
	    "thead",
	    "tr"
	];
	nodes$6.forEach((name) => {
	    registerChild(name);
	});

	const nodes$7 = [
	    "del",
	    "ins",
	    "a",
	    "abbr",
	    "b",
	    "bdi",
	    "bdo",
	    "br",
	    "cite",
	    "code",
	    "data",
	    "dfn",
	    "em",
	    "i",
	    "kbd",
	    "mark",
	    "q",
	    "rb",
	    "rp",
	    "rt",
	    "rtc",
	    "ruby",
	    "s",
	    "samp",
	    "small",
	    "span",
	    "strong",
	    "sub",
	    "sup",
	    "time",
	    "u",
	    "var",
	    "wbr"
	];
	nodes$7.forEach((name) => {
	    registerChild(name);
	});

	exports.IsotopeNode = IsotopeNode;
	exports.createDOMView = createDOMView;
	exports.createStringView = createStringView;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
