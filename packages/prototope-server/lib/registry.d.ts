import { Breakpoints, Config, CurrentData } from "@isotope/prototope/src/declarations";
import { Properties } from "csstype";
import { PrototopeRegistry } from "@isotope/prototope";
interface Listing {
    [identifier: string]: Rule;
}
interface Rule {
    selector: string;
    properties: Properties<string>;
}
/**
 * Class representing Prototope CSS classes registry through strings.
 */
declare class PrototopeStringRegistry extends PrototopeRegistry {
    protected breakpoints: Partial<Breakpoints<Rule[]>>;
    protected breakpointsCount: number;
    protected config: Config;
    protected listing: Listing;
    protected styles: Rule[];
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
    /**
     * Parses style properties to CSS-like string.
     *
     * @param properties - Properties to be parsed.
     * @returns CSS-like string.
     */
    private parseStyleProperties;
    /**
     * Parses style rules to CSS-like string.
     *
     * @param rules - Rules to be parsed.
     * @returns - CSS-like string.
     */
    private parseStyleRules;
}
export { PrototopeStringRegistry };
