import { CustomElement, CustomEvent, Indexable } from "@isotope/core/src/declarations";
import { Properties } from "csstype";

/**
 * Class implementing Isotope CustomElement API, allowing for easy server-side stringification.
 */
class StringElement implements CustomElement {
	public children: StringElement[] = [];

	public classList = {
		add: (...tokens: string[]): void => {
			this.$classes.push(...tokens);
		},
		contains: (token: string): boolean => {
			return this.$classes.includes(token);
		},
		remove: (...tokens: string[]): void => {
			tokens.forEach((token) => {
				this.$classes.splice(this.$classes.indexOf(token), 1);
			});
		}
	};

	public parentElement: StringElement | null = null;

	public style: Properties<string> = {};

	public tagName: string;

	protected $attributes: { [name: string]: string | null } = {};

	protected $classes: string[] = [];

	private $textContent: string | null = "";

	private $events: Indexable<EventListenerOrEventListenerObject[]> = {};

	/**
	 * Creates a new ServerElement instance.
	 *
	 * @param tag - Tag to be used for the element.
	 */
	public constructor(tag: string) {
		this.tagName = tag.toUpperCase();
	}

	/** @private */
	public addEventListener(
		type: string,
		listener: EventListenerOrEventListenerObject
	): void {
		(this.$events[type] || (this.$events[type] = [])).push(listener);
	}

	/** @private */
	public appendChild(newChild: StringElement): StringElement {
		this.children.push(newChild);
		newChild.parentElement = this;

		return newChild;
	}

	/** @private */
	public dispatchEvent(event: CustomEvent): boolean {
		(this.$events[event.type] || []).slice().forEach((handler) => {
			if (typeof handler === "function") {
				handler(event as Event);
			} else {
				handler.handleEvent(event as Event);
			}
		});

		return true;
	}

	/** @private */
	public getAttribute(qualifiedName: string): string | null {
		if (qualifiedName === "style") {
			return Object.entries(this.style)
				.map(([name, value]) => {
					return `${name.replace(
						/[A-Z]/g,
						(match) => `-${match.toLowerCase()}`
					)}: ${value}; `;
				})
				.join("")
				.trim();
		} else if (qualifiedName === "class") {
			return this.$classes.join(" ");
		}

		return this.$attributes[qualifiedName];
	}

	/** @private */
	public insertBefore(
		newChild: StringElement,
		refChild: StringElement | null
	): StringElement {
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
	public removeAttribute(qualifiedName: string): void {
		if (qualifiedName === "style") {
			this.style = {};
		} else if (qualifiedName === "class") {
			this.$classes = [];
		} else {
			this.$attributes[qualifiedName] = null;
		}
	}

	/** @private */
	public removeChild(oldChild: StringElement): StringElement {
		oldChild.parentElement = null;
		this.children.splice(this.children.indexOf(oldChild), 1);

		return oldChild;
	}

	/** @private */
	public removeEventListener(
		type: string,
		listener: EventListenerOrEventListenerObject
	): void {
		if (this.$events[type]) {
			this.$events[type].splice(this.$events[type].indexOf(listener) >>> 0, 1);
		}
	}

	/** @private */
	public setAttribute(qualifiedName: string, value: string): void {
		if (qualifiedName === "style") {
			value.split(";").forEach((property) => {
				const [name, value] = property.split(":");

				if (name && value) {
					const parsedName = name
						.replace(/-([a-z])/g, (match) => match[1].toUpperCase())
						.trim();

					this.style[parsedName as keyof Properties<string>] = value.trim() as any;
				}
			});
		} else if (qualifiedName === "class") {
			this.$classes = value.split(" ");
		} else {
			this.$attributes[qualifiedName] = value;
		}
	}

	/** @private */
	public set textContent(textContent: string | null) {
		this.children = [];
		this.$textContent = textContent || "";
	}

	/** @private */
	public get textContent(): string | null {
		return this.$textContent;
	}

	/**
	 * Stringifies the ServerElement.
	 *
	 * @returns - Stringified ServerElement.
	 */
	public toString(): string {
		const tag = this.tagName.toLowerCase();
		const content =
			this.textContent ||
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

		return `<${tag}${classes ? ` class="${classes}"` : ""}${
			styles ? ` style="${styles}"` : ""
		}${attribs ? ` ${attribs}` : ""}>${content}</${tag}>`;
	}
}

export { StringElement };
