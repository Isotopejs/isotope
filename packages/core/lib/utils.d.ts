interface Change {
    id: SimpleItem;
    item?: Item;
    position?: number;
    type: "add" | "remove" | "move";
}
declare type SimpleItem = string | number;
declare type Item = string | number | {
    id: string | number;
};
/**
 * Detects changes made between 2 Item arrays.
 *
 * @param sourceInput - Original, source Item array.
 * @param targetInput - Target Item array.
 * @returns - Changes that differ the second array from the first one.
 */
declare const detectChanges: (sourceInput: Item[], targetInput: Item[]) => Change[];
export { detectChanges };
