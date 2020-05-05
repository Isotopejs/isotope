import { Breakpoints, Config, CurrentData } from "../declarations";
import { Properties } from "csstype";
import { PrototopeRegistry } from "./registry";
interface Listing {
    [identifier: string]: CSSStyleRule;
}
/**
 * Class representing Prototope CSS classes registry through DOM.
 */
declare class PrototopeDOMRegistry extends PrototopeRegistry {
    protected breakpoints: Partial<Breakpoints<CSSMediaRule>>;
    protected breakpointsCount: number;
    protected config: Config;
    protected listing: Listing;
    protected styleSheet: CSSStyleSheet;
    /**
     * Creates new PrototopeRegistry instance.
     *
     * @param config - Prototope config object.
     */
    constructor(config: Config);
    /**
     * Adds new media breakpoint rule.
     *
     * @param breakpoint - Breakpoint to add media rule for.
     */
    addBreakpoint(breakpoint: keyof Breakpoints<any>): void;
    /**
     * Adds or configures Prototope's CSS rule.
     *
     * @param properties - CSS properties to be set for the rule.
     * @param config - CSS rule configuration.
     * @returns - Rule-related CSS class name.
     */
    addRule(properties: object, config?: CurrentData): string;
    /**
     * Retrieves rule's CSS properties.
     *
     * @param data - Data used to retrieve the rule.
     * @returns - Retrieved CSS properties.
     */
    getRule(data: CurrentData): Properties<string> | null;
    /**
     * Retrieves Prototope's CSS stylesheet string.
     *
     * @returns Prototope's CSS stylesheet string.
     */
    getCSS(): string;
}
export { PrototopeDOMRegistry };
