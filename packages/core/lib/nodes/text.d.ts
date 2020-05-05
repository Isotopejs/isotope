import { Indexable } from "../declarations";
import { IsotopeNode } from "../node";
declare type TextData<S extends Indexable, C extends Indexable> = (node: IsotopeNode<S, C>) => string;
declare module "../node" {
    interface IsotopeNode<S extends Indexable = any, C extends Indexable = any> {
        textData?: TextData<S, C> | null;
        /**
         * Sets the Node's element text.
         *
         * @param text - Text to be set.
         * @returns - The Node.
         */
        text(text: TextData<S, C> | string): this;
    }
}
export {};
