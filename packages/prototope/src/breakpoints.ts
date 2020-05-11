import { Breakpoints, PrototopeContext, Util } from "./declarations";
import { IsotopeNode } from "@isotope/core";

/**
 * Creates Prototope breakpoint directive.
 *
 * @param breakpoint - Name of the breakpoint to be created.
 * @returns - Isotope directive.
 */
const createBreakpoint = (breakpoint: keyof Breakpoints<any>) => (
	utils: Util | Util[]
) => {
	return (node: IsotopeNode<any, PrototopeContext>) => {
		const { data = {} } = node.getContext("prototope") || {};

		if (typeof utils === "function") {
			data.breakpoint = breakpoint;
			utils(node);
		} else {
			utils.forEach((util) => {
				data.breakpoint = breakpoint;
				util(node);
			});
		}
	};
};
const sm = createBreakpoint("sm");
const md = createBreakpoint("md");
const lg = createBreakpoint("lg");
const xl = createBreakpoint("xl");

export { sm, md, lg, xl };
