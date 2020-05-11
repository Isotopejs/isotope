import { Breakpoints, Config, CurrentData } from "../declarations";
import { Properties } from "csstype";
import { PrototopeRegistry } from "./registry";

interface Listing {
	[identifier: string]: CSSStyleRule;
}
/**
 * Class representing Prototope CSS classes registry through DOM.
 */
class PrototopeDOMRegistry extends PrototopeRegistry {
	protected breakpoints: Partial<Breakpoints<CSSMediaRule>> = {};

	protected breakpointsCount = 0;

	protected config: Config;

	protected listing: Listing = {};

	protected styleSheet: CSSStyleSheet;

	/**
	 * Creates new PrototopeRegistry instance.
	 *
	 * @param config - Prototope config object.
	 */
	public constructor(config: Config) {
		super();

		const style = document.createElement("style");

		document.head.appendChild(style);
		this.config = config;
		this.styleSheet = style.sheet as CSSStyleSheet;
	}

	/**
	 * Adds new media breakpoint rule.
	 *
	 * @param breakpoint - Breakpoint to add media rule for.
	 */
	public addBreakpoint(breakpoint: keyof Breakpoints<any>): void {
		if (this.styleSheet && !this.breakpoints[breakpoint]) {
			this.breakpoints[breakpoint] = this.styleSheet.cssRules[
				this.styleSheet.insertRule(
					`@media(min-width:${this.config.breakpoints[breakpoint]}px){}`,
					this.styleSheet.cssRules.length
				)
			] as CSSMediaRule;
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
	public addRule(properties: object, config: CurrentData = {}): string {
		const className = config.className || this.randomID();
		const fullSelector = `${className}${
			config.subSelector ? `:${config.subSelector}` : ""
		}`;
		const listingID = `${
			config.breakpoint ? `${config.breakpoint}-` : ""
		}${fullSelector}`;

		let styles: CSSStyleSheet | CSSMediaRule = this.styleSheet;

		if (config.breakpoint) {
			if (!this.breakpoints[config.breakpoint]) {
				this.addBreakpoint(config.breakpoint);
			}

			styles = this.breakpoints[config.breakpoint]!;
		}

		if (!this.listing[listingID]) {
			const position = styles.cssRules.length - this.breakpointsCount;

			this.listing[listingID] = styles.cssRules[
				styles.insertRule(`.${fullSelector}{}`, position > 0 ? position : 0)
			] as CSSStyleRule;
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
	public getRule(data: CurrentData): Properties<string> | null {
		const fullSelector = `${data.className}${
			data.subSelector ? `:${data.subSelector}` : ""
		}`;
		const listingID = `${data.breakpoint ? `${data.breakpoint}-` : ""}${fullSelector}`;
		const rule = this.listing[listingID];

		if (rule) {
			return rule.style as Properties<string>;
		}

		return null;
	}

	/**
	 * Retrieves Prototope's CSS stylesheet string.
	 *
	 * @returns Prototope's CSS stylesheet string.
	 */
	public getCSS(): string {
		let css = "";

		for (const rule of this.styleSheet.cssRules) {
			css += rule.cssText;
		}

		return css;
	}
}

export { PrototopeDOMRegistry };
