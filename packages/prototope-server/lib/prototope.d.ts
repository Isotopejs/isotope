import { IsotopeNode } from "@isotope/core";
import { PartialConfig } from "@isotope/prototope/src/declarations";
import { Prototope } from "@isotope/prototope";
interface PrototopeServer extends Prototope {
}
/**
 * Prototope wrapper component.
 *
 * @param config - Prototope's config.
 * @returns - Prototope setup object.
 */
declare const PrototopeServer: (config?: PartialConfig) => (parent: IsotopeNode<any, any>) => Prototope;
export { PrototopeServer };
