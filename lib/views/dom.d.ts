import { IsotopeNode } from "../node";
interface IsotopeViewConfig {
    attach?: boolean;
    clean?: boolean;
}
/**
 * Creates a DOM View.
 *
 * @param element - Element to append to.
 * @param config - DOM View config.
 * @returns - The created top-level Node.
 */
declare const createDOMView: (element: Element, config?: IsotopeViewConfig | undefined) => IsotopeNode<any, any>;
export { createDOMView };
