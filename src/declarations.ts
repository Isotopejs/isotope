import { IsotopeNode } from "./node";
import { Properties } from "csstype";

interface CustomDOM {
	createElement(qualifiedName: string, namespaceURI?: string): CustomElement;
	createEvent(type: string, eventInitDict?: EventInit | undefined): CustomEvent;
}

interface CustomElement {
	children: { [index: number]: CustomElement };
	classList: {
		add(...tokens: string[]): void;
		contains(token: string): boolean;
		remove(...tokens: string[]): void;
	};
	parentElement: CustomElement | null;
	style?: Properties<string>;
	tagName: string;
	textContent: string | null;
	addEventListener(
		type: string,
		listener: EventListenerOrEventListenerObject,
		options?: boolean | AddEventListenerOptions | undefined
	): void;
	appendChild(newChild: CustomElement): CustomElement;
	dispatchEvent(event: CustomEvent): boolean;
	getAttribute(qualifiedName: string): string | null;
	insertBefore(newChild: CustomElement, refChild: CustomElement | null): CustomElement;
	removeAttribute(qualifiedName: string): void;
	removeChild(oldChild: CustomElement): CustomElement;
	removeEventListener(
		type: string,
		listener: EventListenerOrEventListenerObject,
		options?: boolean | EventListenerOptions | undefined
	): void;
	setAttribute(qualifiedName: string, value: string): void;
}

interface CustomEvent {
	type: string;
}

interface Indexable<T = any> {
	[key: string]: T;
}

type ConfigFunction<S extends Indexable, C extends Indexable, V> = (
	node: IsotopeNode<S, C>
) => V;

type StyleProperties = {
	[P in keyof Properties]: Properties<number | string>[P] | string;
};

export {
	ConfigFunction,
	CustomDOM,
	CustomElement,
	CustomEvent,
	Indexable,
	StyleProperties
};
