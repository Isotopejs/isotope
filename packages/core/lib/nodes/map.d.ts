import { Indexable } from "../declarations";
import { IsotopeNode } from "../node";
interface MapData<S extends Indexable, C extends Indexable, I extends MappableItem = MappableItem> {
    items: Exclude<Mappable<S, C, I>, any[]>;
    createItem(item: any, node: IsotopeNode<S, C>, index: number): IsotopeNode | void;
}
declare type MappableItem = string | number | {
    id: string | number;
};
declare type Mappable<S extends Indexable, C extends Indexable, I extends MappableItem = MappableItem> = I[] | keyof S | ((node: IsotopeNode<S, C>) => I[]);
declare module "../node" {
    interface IsotopeNode<S extends Indexable = any, C extends Indexable = any> {
        mapData?: MapData<S, C> | null;
        /**
         * Maps the provided data to a rendered Nodes list.
         *
         * @param items - Items to be mapped.
         * @param createItem - Rendering function to be used to render mapped items.
         * @returns - The Node.
         */
        map<I extends MappableItem>(items: Mappable<S, C, I>, createItem: (item: I, node: this, index: number) => IsotopeNode | void): this;
    }
}
export {};
