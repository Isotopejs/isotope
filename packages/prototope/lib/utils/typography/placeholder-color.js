import { createUtil } from "../util";
import { placeholder } from "../../sub-selectors";
/**
 * Prototope placeholder color util.
 *
 * @param value - Config value.
 * @returns - Prototope util.
 */
const placeholderColor = (value) => {
    return placeholder(createUtil(({ colors }) => ({
        color: colors[value]
    })));
};
export { placeholderColor };
//# sourceMappingURL=placeholder-color.js.map