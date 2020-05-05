import {
	Breakpoints,
	CurrentData,
	PrototopeRegistry as PrototopeRegistryInterface
} from "../declarations";
import { Properties } from "csstype";

/**
 * Class representing Prototope CSS classes registry.
 */
abstract class PrototopeRegistry implements PrototopeRegistryInterface {
	/**
	 * Creates random ID.
	 *
	 * @returns - Random ID.
	 */
	protected randomID(): string {
		const radix = 36;
		const startIndex = 2;
		const endIndex = 11;

		return `_${Math.random().toString(radix).slice(startIndex, endIndex)}`;
	}

	public abstract addBreakpoint(breakpoint: keyof Breakpoints<any>): void;

	public abstract addRule(properties: Properties<string>, config: CurrentData): string;

	public abstract getRule(data: CurrentData): Properties<string> | null;

	public abstract getCSS(): string;
}

export { PrototopeRegistry };
