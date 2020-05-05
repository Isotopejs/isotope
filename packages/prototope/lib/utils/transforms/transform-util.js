import { createUtil } from "../util";
/**
 * Creates Prototope transform util.
 *
 * @param properties - Transform properties.
 * @returns - Prototope transform util.
 */
const createTransformUtil = (properties) => {
    return createUtil((config, data, registry) => {
        let { transform = "" } = registry.getRule(data) || {};
        Object.entries(properties).forEach(([name, value]) => {
            if (transform.includes(name)) {
                const match = new RegExp(`${name}\\(.+?\\)`, "g");
                transform = transform.replace(match, `${name}(${value})`);
            }
            else {
                transform += ` ${name}(${value})`;
            }
        });
        return {
            transform: transform.trim()
        };
    });
};
export { createTransformUtil };
//# sourceMappingURL=transform-util.js.map