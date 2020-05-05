import { PrototopeDOMRegistry } from "./registry";
import { applyDefaultConfig } from "./config";
/**
 * Prototope wrapper component.
 *
 * @param config - Prototope's config.
 * @param registry - Function creating custom implementation of PrototopeRegistry.
 * @returns - Prototope setup object.
 */
const Prototope = (config = {}, registry) => (parent) => {
    const fullConfig = applyDefaultConfig(config);
    const node = parent.child("div", {
        context: {
            prototope: {
                config: fullConfig,
                data: {},
                registry: registry ? registry(fullConfig) : new PrototopeDOMRegistry(fullConfig)
            }
        }
    });
    /**
     * Retrieves Prototope's CSS stylesheet string.
     *
     * @returns - Prototope's CSS stylesheet string.
     */
    const getCSS = () => {
        const prototope = node.getContext("prototope");
        if (prototope) {
            return prototope.registry.getCSS();
        }
        return "";
    };
    return {
        getCSS,
        node
    };
};
export { Prototope };
//# sourceMappingURL=prototope.js.map