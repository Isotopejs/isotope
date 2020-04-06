import { Indexable } from "../declarations";
import { IsotopeNode } from "../node";
interface ConditionalData<S extends Indexable, C extends Indexable> {
    previous?: boolean;
    condition: keyof S | ((node: IsotopeNode<S, C>) => boolean);
    onTrue(node: IsotopeNode<S, C>): IsotopeNode | void;
    onFalse?(node: IsotopeNode<S, C>): IsotopeNode | void;
}
declare module "../node" {
    interface IsotopeNode<S extends Indexable = any, C extends Indexable = any> {
        conditionalData?: ConditionalData<S, C> | null;
        /**
         * Conditionally renders the provided nodes.
         *
         * @param condition - Condition to be checked.
         * @param onTrue - Rendering function to be executed when condition is truthy.
         * @param onFalse - Rendering function to be executed when condition is falsy.
         * @returns - The Node.
         */
        if(condition: boolean | keyof S | ((node: this) => boolean), onTrue: (node: this) => IsotopeNode | void, onFalse?: (node: this) => IsotopeNode | void): this;
    }
}
export {};
