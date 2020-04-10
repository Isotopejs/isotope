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
declare type Directive<S extends Indexable, C extends Indexable, R extends void | any> = (node: IsotopeNode<S, C>) => R;
/**
 * Class representing a Node.
 */
declare class IsotopeNode<S extends Indexable = any, C extends Indexable = any> implements IsotopeNode<S, C> {
    state?: S;
    context?: C;
    id?: string;
    linked?: IsotopeNode[] | null;
    element: CustomElement;
    protected linkup?: IsotopeNode | null;
    protected childIndex?: number;
    protected autoLink?: boolean;
    /**
     * Creates a new Node.
     *
     * @param element -  The Node's HTML element or tag.
     * @param config - The Node's configuration.
     */
    constructor(element: string | CustomElement | Element, config?: IsotopeNodeConfig<S, C> | string);
    /**
     * Executes the provided directive(s).
     *
     * @param directives - Directive(s) to be executed.
     * @returns - The Node or the return value of the directive.
     */
    $<R extends void | any>(directives: Directive<S, C, R> | Array<Directive<S, C, void>>): R extends void ? this : R;
    /**
     * Adds a child Node to the Node.
     *
     * @param tag - Child Node's HTML tag.
     * @param config - Child Node's configuration.
     * @returns - The created child Node.
     */
    child<S2 extends Indexable = Indexable, C2 extends Indexable = Indexable>(tag: string, config?: IsotopeNodeConfig<S2, Partial<C> & C2> | string): IsotopeNode<S2, Partial<C> & C2>;
    /**
     * Cleans the Node's child tree.
     *
     * @returns - IsotopeNode.
     */
    clean(): this;
    /**
     * Emits the specified event.
     *
     * @param event - Event to be emitted.
     * @param data - Data to be passed to the listening function.
     * @returns - IsotopeNode.
     */
    emit(event: string, data?: object): this;
    /**
     * Retrieves the data from the Node's context.
     *
     * @param key - Data key to be retrieved.
     * @returns - The retrieved data.
     */
    getContext<K extends keyof C>(key: K): C[K] | null;
    /**
     * Retrieves the data from the Node's state.
     *
     * @param key - Data key to be retrieved.
     * @returns - The retrieved data.
     */
    getState<K extends keyof S>(key: K): S[K] | null;
    /**
     * Links the provided Node.
     *
     * @param node - Node to be linked.
     * @param position - Position to place Node at in the linked array.
     * @returns - IsotopeNode.
     */
    link(node: IsotopeNode, position?: number): this;
    /**
     * Moves the linked Node to the provided position.
     *
     * @param position - Position index to move the Node to.
     * @returns - IsotopeNode.
     */
    move(position: number): this;
    /**
     * Disables the specified event listener.
     *
     * @param event - Event to disable the listener for.
     * @param handler - Event handler to be disabled.
     * @param options - Event listening options.
     * @returns - IsotopeNode.
     */
    off<K extends keyof HTMLElementEventMap>(event: K | string, handler: (ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): this;
    /**
     * Setups an event listener for the specified event.
     *
     * @param event - Event to be listened to.
     * @param handler - Event handling function.
     * @param options - Event listening options.
     * @returns - IsotopeNode.
     */
    on<K extends keyof HTMLElementEventMap>(event: K | string, handler: (data: HTMLElementEventMap[K]) => void, options?: boolean | AddEventListenerOptions): this;
    /**
     * Removes the Node.
     *
     * @returns - IsotopeNode.
     */
    remove(): this;
    /**
     * Sets the Node's state.
     *
     * @param state - State object to be set.
     * @returns - IsotopeNode.
     */
    setState(state: Partial<S>): this;
    /**
     * Stringifies Node's element.
     *
     * @returns - Stringified Node's element.
     */
    toString(): string;
    /**
     * Retrieves the proper element from Node's configuration.
     *
     * @param element -  The Node's element or tag.
     * @param config - The Node's configuration.
     * @returns - Retrieved element.
     */
    protected getElement(element: string | CustomElement | Element, config?: IsotopeNodeConfig<S, C> | string): CustomElement;
    /**
     * Processes and renders the Node.
     */
    protected process(): void;
}
export { IsotopeNode, IsotopeNodeConfig };
