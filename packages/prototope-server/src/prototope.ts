import { IsotopeNode } from "@isotope/core";
import { PartialConfig } from "@isotope/prototope/src/declarations";
import { Prototope } from "@isotope/prototope";
import { PrototopeStringRegistry } from "./registry";

interface PrototopeServer extends Prototope {}

/**
 * Prototope wrapper component.
 *
 * @param config - Prototope's config.
 * @returns - Prototope setup object.
 */
const PrototopeServer = (config: PartialConfig = {}) => (
  parent: IsotopeNode
): Prototope => {
  return Prototope(
    config,
    (config) => new PrototopeStringRegistry(config)
  )(parent);
};

export { PrototopeServer };
