import { CustomElement } from "../../declarations";
import { Properties } from "csstype";
/**
 * Class implementing Isotope CustomElement API, allowing for easy server-side stringification.
 */
declare class StringElement implements CustomElement {
    children: StringElement[];
    classList: {
        add: (...tokens: string[]) => void;
        contains: (token: string) => boolean;
        remove: (...tokens: string[]) => void;
    };
    parentElement: StringElement | null;
    style: Properties<string>;
    tagName: string;
    protected attributes: {
        [name: string]: string | null;
    };
    protected classes: string[];
    private $textContent;
    private events;
    /**
     * Creates a new ServerElement instance.
     *
     * @param tag - Tag to be used for the element.
     */
    constructor(tag: string);
    /** @private */
    addEventListener(type: string, listener: EventListenerOrEventListenerObject): void;
    /** @private */
    appendChild(newChild: StringElement): StringElement;
    /** @private */
    dispatchEvent(event: CustomEvent): boolean;
    /** @private */
    getAttribute(qualifiedName: string): string | null;
    /** @private */
    insertBefore(newChild: StringElement, refChild: StringElement | null): StringElement;
    /** @private */
    removeAttribute(qualifiedName: string): void;
    /** @private */
    removeChild(oldChild: StringElement): StringElement;
    /** @private */
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject): void;
    /** @private */
    setAttribute(qualifiedName: string, value: string): void;
    /** @private */
    set textContent(textContent: string | null);
    /** @private */
    get textContent(): string | null;
    /**
     * Stringifies the ServerElement.
     *
     * @returns - Stringified ServerElement.
     */
    toString(): string;
}
export { StringElement };
