import { CustomDOM, CustomElement, Indexable } from "./declarations";

interface IsotopeNodeConfig<S extends Indexable, C extends Indexable> {
	namespace?: string;
	autoLink?: boolean;
	attach?: boolean;
	context?: C;
	state?: S;
}

interface IsotopeNode<S extends Indexable = any, C extends Indexable = any> {
	onCreate: Array<(node: this, config: IsotopeNodeConfig<S, C>) => void>;
	onProcess: Array<(node: this) => void>;
	onClean: Array<(node: this) => void>;
	customDOM?: CustomDOM | null;
}

type Directive<S extends Indexable, C extends Indexable, R extends void | any> = (
	node: IsotopeNode<S, C>
) => R;

/**
 * Class representing a Node.
 */
class IsotopeNode<S extends Indexable = any, C extends Indexable = any>
	implements IsotopeNode<S, C> {
	public state?: S;

	public context?: C;

	public id?: string;

	public linked?: IsotopeNode[] | null;

	public element: CustomElement;

	protected linkup?: IsotopeNode | null;

	protected childIndex?: number;

	protected autoLink?: boolean;

	protected listenedEvents?: string[];

	/**
	 * Creates a new Node.
	 *
	 * @param element -  The Node's HTML element or tag.
	 * @param config - The Node's configuration.
	 */
	public constructor(
		element: string | CustomElement | Element,
		config?:
			| IsotopeNodeConfig<S, C>
			| string
			| Directive<S, C, void>
			| Array<Directive<S, C, void>>
	) {
		this.element = this.getElement(element, config);

		if (typeof config === "string") {
			this.element.textContent = config;
		} else if (typeof config === "object" && !Array.isArray(config)) {
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
		} else if (config) {
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
	public $<R extends void | any>(
		directives: Directive<S, C, R> | Array<Directive<S, C, void>>
	): R extends void ? this : R {
		if (Array.isArray(directives)) {
			directives.forEach((directive) => {
				directive(this);
			});
		} else {
			const value = directives(this);

			if (typeof value !== "undefined") {
				return value as R extends void ? this : R;
			}
		}

		return this as R extends void ? this : R;
	}

	/**
	 * Adds a child Node to the Node.
	 *
	 * @param tag - Child Node's HTML tag.
	 * @param config - Child Node's configuration.
	 * @returns - The created child Node.
	 */
	public child<S2 extends Indexable = Indexable, C2 extends Indexable = Indexable>(
		tag: string,
		config?:
			| IsotopeNodeConfig<S2, Partial<C> & C2>
			| string
			| Directive<S2, Partial<C> & C2, void>
			| Array<Directive<S2, Partial<C> & C2, void>>
	): IsotopeNode<S2, Partial<C> & C2> {
		const shouldAttach = typeof this.childIndex !== "undefined";

		let element: CustomElement | Element | string = tag;

		if (shouldAttach) {
			const attachTarget = this.element.children[this.childIndex || 0];

			if (attachTarget) {
				element = attachTarget;
				this.childIndex = (this.childIndex || 0) + 1;
			}
		}

		const node = new IsotopeNode<S2, Partial<C> & C2>(element, config);

		this.element.appendChild(node.element);

		if (shouldAttach && !node.childIndex) {
			node.childIndex = 0;
		}

		if (this.context) {
			if (node.context) {
				node.context = Object.assign(node.context, this.context);
			} else {
				node.context = this.context as C & C2;
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
	public clean(): this {
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
	public emit(event: string, data: object = {}): this {
		if (this.listenedEvents && this.listenedEvents.includes(event)) {
			this.element.dispatchEvent(
				Object.assign(
					this.customDOM ? this.customDOM.createEvent(event) : new Event(event),
					data
				)
			);
		}

		return this;
	}

	/**
	 * Retrieves the data from the Node's context.
	 *
	 * @param key - Data key to be retrieved.
	 * @returns - The retrieved data.
	 */
	public getContext<K extends keyof C>(key: K): C[K] | null {
		return this.context ? this.context[key] : null;
	}

	/**
	 * Retrieves the data from the Node's state.
	 *
	 * @param key - Data key to be retrieved.
	 * @returns - The retrieved data.
	 */
	public getState<K extends keyof S>(key: K): S[K] | null {
		return this.state ? this.state[key] : null;
	}

	/**
	 * Links the provided Node.
	 *
	 * @param node - Node to be linked.
	 * @param position - Position to place Node at in the linked array.
	 * @returns - IsotopeNode.
	 */
	public link(node: IsotopeNode, position?: number): this {
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
			} else {
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
	public move(position: number): this {
		const { linkup } = this;

		if (linkup && linkup.linked) {
			const upperLinked = linkup.linked;
			const [node] = upperLinked.splice(upperLinked.indexOf(this as any), 1);

			upperLinked.splice(position, 0, node);

			const referenceNode = upperLinked[position + 1];

			linkup.element.insertBefore(
				this.element,
				referenceNode ? referenceNode.element : null
			);
		}

		return this;
	}

	/**
	 * Disables the specified event listener.
	 *
	 * @param event - Event to disable the listener for.
	 * @param handler - Event handler to be disabled.
	 * @param options - Event listening options.
	 * @returns - IsotopeNode.
	 */
	public off<K extends keyof HTMLElementEventMap>(
		event: K | string,
		handler: (ev: HTMLElementEventMap[K]) => any,
		options?: boolean | EventListenerOptions
	): this;

	/** @private */
	public off(
		event: string,
		handler: EventListenerOrEventListenerObject,
		options?: boolean | EventListenerOptions
	): this {
		this.element.removeEventListener(event, handler, options);

		return this;
	}

	/**
	 * Setups an event listener for the specified event.
	 *
	 * @param event - Event to be listened to.
	 * @param handler - Event handling function.
	 * @param options - Event listening options.
	 * @returns - IsotopeNode.
	 */
	public on<K extends keyof HTMLElementEventMap>(
		event: K | string,
		handler: (data: HTMLElementEventMap[K]) => void,
		options?: boolean | AddEventListenerOptions
	): this;

	/** @private */
	public on(
		event: string,
		handler: EventListenerOrEventListenerObject,
		options?: boolean | AddEventListenerOptions
	): this {
		this.element.addEventListener(event, handler, options);

		if (this.listenedEvents) {
			this.listenedEvents.push(event);
		} else {
			this.listenedEvents = [event];
		}

		return this;
	}

	/**
	 * Removes the Node.
	 *
	 * @returns - IsotopeNode.
	 */
	public remove(): this {
		const { linkup } = this;

		if (linkup && linkup.linked) {
			linkup.linked.splice(linkup.linked.indexOf(this as any), 1);
		}

		if (this.linked) {
			this.linked = null;
		}

		if (this.element.parentElement) {
			this.element.parentElement.removeChild(this.element);
		}

		this.emit("node-removed", { node: this });

		return this;
	}

	/**
	 * Sets the Node's state.
	 *
	 * @param state - State object to be set.
	 * @returns - IsotopeNode.
	 */
	public setState(state: Partial<S>): this {
		if (this.state) {
			Object.assign(this.state, state);
			this.emit("state-changed", { node: this });
			this.process();
		}

		return this;
	}

	/**
	 * Stringifies Node's element.
	 *
	 * @returns - Stringified Node's element.
	 */
	public toString(): string {
		return `${this.element}`;
	}

	/**
	 * Retrieves the proper element from Node's configuration.
	 *
	 * @param element -  The Node's element or tag.
	 * @param config - The Node's configuration.
	 * @returns - Retrieved element.
	 */
	protected getElement(
		element: string | CustomElement | Element,
		config?:
			| IsotopeNodeConfig<S, C>
			| string
			| Directive<S, C, void>
			| Array<Directive<S, C, void>>
	): CustomElement {
		if (typeof element === "string") {
			if (typeof config === "object" && !Array.isArray(config) && config.namespace) {
				if (this.customDOM) {
					return this.customDOM.createElement(element, config.namespace);
				}

				return (document.createElementNS(
					config.namespace,
					element
				) as any) as CustomElement;
			} else if (this.customDOM) {
				return this.customDOM.createElement(element);
			}

			return (document.createElement(element) as any) as CustomElement;
		}

		return element as CustomElement;
	}

	/**
	 * Processes and renders the Node.
	 */
	protected process(): void {
		this.emit("node-updated", { node: this });
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

export { Directive, IsotopeNode, IsotopeNodeConfig };
