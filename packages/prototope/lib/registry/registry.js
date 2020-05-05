/**
 * Class representing Prototope CSS classes registry.
 */
class PrototopeRegistry {
    /**
     * Creates random ID.
     *
     * @returns - Random ID.
     */
    randomID() {
        const radix = 36;
        const startIndex = 2;
        const endIndex = 11;
        return `_${Math.random().toString(radix).slice(startIndex, endIndex)}`;
    }
}
export { PrototopeRegistry };
//# sourceMappingURL=registry.js.map