import { ConfigFunction, Indexable } from "../declarations";
declare module "../node" {
    interface IsotopeNode<S extends Indexable = any, C extends Indexable = any> {
        attribs?: ConfigFunction<S, C, Indexable<string | boolean>>;
        /**
         * Retrieves the value of the specified attribute.
         *
         * @param attrib - Attribute to be retrieved.
         * @returns - The retrieved value.
         */
        getAttrib(attrib: string): string | boolean | null;
        /**
         * Sets the value of the specified attribute.
         *
         * @param attrib - Attribute to be set.
         * @param value - Value to assigned.
         * @returns - IsotopeNode.
         */
        setAttrib(attrib: string, value?: string | boolean): this;
        /**
         * Sets multiple attributes.
         *
         * @param attribs - Object with key-value pairs of attributes and their values.
         * @returns - IsotopeNode.
         */
        setAttribs(attribs: Indexable): this;
    }
    interface IsotopeNodeConfig<S extends Indexable, C extends Indexable> {
        attribs?: Indexable | ConfigFunction<S, C, Indexable>;
    }
}
