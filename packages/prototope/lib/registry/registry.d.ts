import { Breakpoints, CurrentData, PrototopeRegistry as PrototopeRegistryInterface } from "../declarations";
import { Properties } from "csstype";
/**
 * Class representing Prototope CSS classes registry.
 */
declare abstract class PrototopeRegistry implements PrototopeRegistryInterface {
    /**
     * Creates random ID.
     *
     * @returns - Random ID.
     */
    protected randomID(): string;
    abstract addBreakpoint(breakpoint: keyof Breakpoints<any>): void;
    abstract addRule(properties: Properties<string>, config: CurrentData): string;
    abstract getRule(data: CurrentData): Properties<string> | null;
    abstract getCSS(): string;
}
export { PrototopeRegistry };
