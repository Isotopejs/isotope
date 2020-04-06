import { ConfigFunction, Indexable } from "../declarations";
declare module "../node" {
    interface IsotopeNode<S extends Indexable = any, C extends Indexable = any> {
        classes?: ConfigFunction<S, C, string[] | Indexable<boolean>>;
        /**
         * Applies the specified CSS class name to the Node's element.
         *
         * @param className - CSS class name to be applied.
         * @returns - IsotopeNode.
         */
        addClass(className: string): this;
        /**
         * Checks if the Node's element contains the specified CSS class name.
         *
         * @param className - CSS class name to be checked.
         * @returns - If the Node's element contains the specified CSS class name.
         */
        hasClass(className: string): boolean;
        /**
         * Removes the specified CSS class name from the Node's element.
         *
         * @param className - CSS class name to be removed.
         * @returns - IsotopeNode.
         */
        removeClass(className: string): this;
        /**
         * Sets multiple CSS class names.
         *
         * @param classes - Object or array with CSS class name to be set.
         * @returns - IsotopeNode.
         */
        setClasses(classes: string[] | Indexable<boolean>): this;
    }
    interface IsotopeNodeConfig<S extends Indexable, C extends Indexable> {
        classes?: string[] | Indexable<boolean> | ConfigFunction<S, C, Indexable<boolean> | string[]>;
    }
}
