import { Config, PartialConfig, PrototopeContext, PrototopeRegistry } from "./declarations";
import { IsotopeNode } from "@isotope/core";
interface Prototope {
    node: IsotopeNode<any, PrototopeContext>;
    getCSS(): string;
}
/**
 * Prototope wrapper component.
 *
 * @param config - Prototope's config.
 * @param registry - Function creating custom implementation of PrototopeRegistry.
 * @returns - Prototope setup object.
 */
declare const Prototope: (config?: PartialConfig, registry?: ((config: Config) => PrototopeRegistry) | undefined) => (parent: IsotopeNode<any, any>) => Prototope;
export { Prototope, PrototopeContext };
