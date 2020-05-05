import { Config, Context, PartialConfig, PrototopeRegistry } from "./declarations";
import { IsotopeNode } from "@isotope/core";
interface Prototope {
    node: IsotopeNode<any, Context>;
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
export { Prototope };
