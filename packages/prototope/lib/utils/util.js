/**
 * Creates Prototope utility directive.
 *
 * @param utilConfig - Utility configuration function.
 * @returns - Isotope directive.
 */
const createUtil = (utilConfig) => {
    return (node) => {
        const { config, data, registry } = node.getContext("prototope") || {};
        if (config && data && registry) {
            const properties = typeof utilConfig === "object" ? utilConfig : utilConfig(config, data, registry);
            if (data.className && !node.hasClass(data.className)) {
                data.className = null;
            }
            data.className = registry.addRule(properties, data);
            if (!node.hasClass(data.className)) {
                node.addClass(data.className);
            }
            data.breakpoint = null;
            data.subSelector = null;
        }
    };
};
export { createUtil };
//# sourceMappingURL=util.js.map