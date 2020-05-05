import { Config, Context, CurrentData, PrototopeRegistry } from "../declarations";
import { IsotopeNode } from "@isotope/core";
import { Properties } from "csstype";
declare type UtilConfig = ((config: Config, data: CurrentData, registry: PrototopeRegistry) => Properties<string>) | Properties<string>;
/**
 * Creates Prototope utility directive.
 *
 * @param utilConfig - Utility configuration function.
 * @returns - Isotope directive.
 */
declare const createUtil: (utilConfig: UtilConfig) => (node: IsotopeNode<any, Context>) => void;
export { createUtil };
