import { Prototope } from "@isotope/prototope";
import { PrototopeStringRegistry } from "./registry";
/**
 * Prototope wrapper component.
 *
 * @param config - Prototope's config.
 * @returns - Prototope setup object.
 */
const PrototopeServer = (config = {}) => (parent) => {
    return Prototope(config, (config) => new PrototopeStringRegistry(config))(parent);
};
export { PrototopeServer };
//# sourceMappingURL=prototope.js.map