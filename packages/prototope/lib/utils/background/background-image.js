import { createUtil } from "../util";
const bgGradient = createUtil(({ colors }) => ({
    backgroundImage: `linear-gradient(45deg,${colors.primary},${colors.secondary})`
}));
/**
 * Prototope background-image util.
 *
 * @param url - Background image URL.
 * @returns - Prototope util.
 */
const bgUrl = (url) => {
    return createUtil({
        backgroundImage: `url("${url}")`
    });
};
export { bgGradient, bgUrl };
//# sourceMappingURL=background-image.js.map