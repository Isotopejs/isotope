import { PrototopeRegistry } from "./registry";
/**
 * Class representing Prototope CSS classes registry through DOM.
 */
class PrototopeDOMRegistry extends PrototopeRegistry {
    /**
     * Creates new PrototopeRegistry instance.
     *
     * @param config - Prototope config object.
     */
    constructor(config) {
        super();
        this.breakpoints = {};
        this.breakpointsCount = 0;
        this.listing = {};
        const style = document.createElement("style");
        document.head.appendChild(style);
        this.config = config;
        this.styleSheet = style.sheet;
    }
    /**
     * Adds new media breakpoint rule.
     *
     * @param breakpoint - Breakpoint to add media rule for.
     */
    addBreakpoint(breakpoint) {
        if (this.styleSheet && !this.breakpoints[breakpoint]) {
            this.breakpoints[breakpoint] = this.styleSheet.cssRules[this.styleSheet.insertRule(`@media(min-width:${this.config.breakpoints[breakpoint]}px){}`, this.styleSheet.cssRules.length)];
            this.breakpointsCount += 1;
        }
    }
    /**
     * Adds or configures Prototope's CSS rule.
     *
     * @param properties - CSS properties to be set for the rule.
     * @param config - CSS rule configuration.
     * @returns - Rule-related CSS class name.
     */
    addRule(properties, config = {}) {
        const className = config.className || this.randomID();
        const fullSelector = `${className}${config.subSelector ? `:${config.subSelector}` : ""}`;
        const listingID = `${config.breakpoint ? `${config.breakpoint}-` : ""}${fullSelector}`;
        let styles = this.styleSheet;
        if (config.breakpoint) {
            if (!this.breakpoints[config.breakpoint]) {
                this.addBreakpoint(config.breakpoint);
            }
            styles = this.breakpoints[config.breakpoint];
        }
        if (!this.listing[listingID]) {
            const position = styles.cssRules.length - this.breakpointsCount;
            this.listing[listingID] = styles.cssRules[styles.insertRule(`.${fullSelector}{}`, position > 0 ? position : 0)];
        }
        Object.assign(this.listing[listingID].style, properties);
        return className;
    }
    /**
     * Retrieves rule's CSS properties.
     *
     * @param data - Data used to retrieve the rule.
     * @returns - Retrieved CSS properties.
     */
    getRule(data) {
        const fullSelector = `${data.className}${data.subSelector ? `:${data.subSelector}` : ""}`;
        const listingID = `${data.breakpoint ? `${data.breakpoint}-` : ""}${fullSelector}`;
        const rule = this.listing[listingID];
        if (rule) {
            return rule.style;
        }
        return null;
    }
    /**
     * Retrieves Prototope's CSS stylesheet string.
     *
     * @returns Prototope's CSS stylesheet string.
     */
    getCSS() {
        let css = "";
        for (const rule of this.styleSheet.cssRules) {
            css += rule.cssText;
        }
        return css;
    }
}
export { PrototopeDOMRegistry };
//# sourceMappingURL=dom.js.map