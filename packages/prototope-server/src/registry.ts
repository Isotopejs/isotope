import {
  Breakpoints,
  Config,
  CurrentData
} from "@isotope/prototope/src/declarations";
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
class PrototopeStringRegistry extends PrototopeRegistry {
  protected breakpoints: Partial<Breakpoints<Rule[]>> = {};

  protected breakpointsCount = 0;

  protected config: Config;

  protected listing: Listing = {};

  protected styles: Rule[] = [];

  /**
   * Creates new PrototopeRegistry instance.
   *
   * @param config - Prototope config object.
   */
  public constructor(config: Config) {
    super();
    this.config = config;
  }

  /**
   * Adds new media breakpoint rule.
   *
   * @param breakpoint - Breakpoint to add media rule for.
   */
  public addBreakpoint(breakpoint: keyof Breakpoints<any>): void {
    if (!this.breakpoints[breakpoint]) {
      this.breakpoints[breakpoint] = [];
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
      config.selector ? `:${config.selector}` : ""
    }`;
    const listingID = `${
      config.breakpoint ? `${config.breakpoint}-` : ""
    }${fullSelector}`;

    let { styles } = this;

    if (config.breakpoint) {
      if (!this.breakpoints[config.breakpoint]) {
        this.addBreakpoint(config.breakpoint);
      }

      styles = this.breakpoints[config.breakpoint]!;
    }

    if (!this.listing[listingID]) {
      const position = styles.length - this.breakpointsCount;
      const rule = {
        properties: {},
        selector: fullSelector
      };

      styles.splice(position > 0 ? position : 0, 0, rule);
      this.listing[listingID] = rule;
    }

    Object.assign(this.listing[listingID].properties, properties);

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
      data.selector ? `:${data.selector}` : ""
    }`;
    const listingID = `${
      data.breakpoint ? `${data.breakpoint}-` : ""
    }${fullSelector}`;
    const rule = this.listing[listingID];

    return rule ? rule.properties : null;
  }

  /**
   * Retrieves Prototope's CSS stylesheet string.
   *
   * @returns Prototope's CSS stylesheet string.
   */
  public getCSS(): string {
    const basicStyles = this.parseStyleRules(this.styles);
    const breakpointStyles = Object.entries(this.breakpoints)
      .map(([breakpoint, styles]) => {
        return `@media(min-width:${
          this.config.breakpoints[breakpoint as keyof Breakpoints<any>]
        }px){${this.parseStyleRules(styles || [])}}`;
      })
      .join("");

    return `${basicStyles}${breakpointStyles}`;
  }

  /**
   * Parses style properties to CSS-like string.
   *
   * @param properties - Properties to be parsed.
   * @returns CSS-like string.
   */
  private parseStyleProperties(properties: Properties<string>): string {
    return Object.entries(properties)
      .map(([property, value]) => {
        return `${property.replace(
          /[A-Z]/g,
          (match) => `-${match.toLowerCase()}`
        )}:${value};`;
      })
      .join("");
  }

  /**
   * Parses style rules to CSS-like string.
   *
   * @param rules - Rules to be parsed.
   * @returns - CSS-like string.
   */
  private parseStyleRules(rules: Rule[]): string {
    return rules
      .map((rule) => {
        return `.${rule.selector}{${this.parseStyleProperties(
          rule.properties
        )}}`;
      })
      .join("");
  }
}

export { PrototopeStringRegistry };
