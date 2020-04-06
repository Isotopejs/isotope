import { ConfigFunction, Indexable, StyleProperties } from "../declarations";
declare module "../node" {
    interface IsotopeNode<S extends Indexable = any, C extends Indexable = any> {
        styles?: ConfigFunction<S, C, StyleProperties>;
        /**
         * Retrieves the value of the specified style property.
         *
         * @param property - Property to be retrieved.
         * @returns - The retrieved value.
         */
        getStyle<P extends keyof StyleProperties>(property: P): StyleProperties[P] | undefined;
        /**
         * Sets the specified style property.
         *
         * @param property - Property to be set.
         * @param value - Value to be assigned.
         * @returns - IsotopeNode.
         */
        setStyle<P extends keyof StyleProperties>(property: P, value: StyleProperties[P]): this;
        /**
         * Sets multiple style properties.
         *
         * @param styles - Object with style properties to be set.
         * @returns - IsotopeNode.
         */
        setStyles(this: IsotopeNode, styles: StyleProperties): this;
    }
    interface IsotopeNodeConfig<S extends Indexable, C extends Indexable> {
        styles?: StyleProperties | ConfigFunction<S, C, StyleProperties>;
    }
}
