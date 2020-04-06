import { Indexable } from "../declarations";
import { IsotopeNode } from "../node";
import { detectChanges } from "../utils";

interface MapData<
	S extends Indexable,
	C extends Indexable,
	I extends MappableItem = MappableItem
> {
	items: Exclude<Mappable<S, C, I>, any[]>;
	createItem(item: any, node: IsotopeNode<S, C>, index: number): IsotopeNode | void;
}

type MappableItem = string | number | { id: string | number };

type Mappable<
	S extends Indexable,
	C extends Indexable,
	I extends MappableItem = MappableItem
> = I[] | keyof S | ((node: IsotopeNode<S, C>) => I[]);

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
		map<I extends MappableItem>(
			items: Mappable<S, C, I>,
			createItem: (item: I, node: this, index: number) => IsotopeNode | void
		): this;
	}
}

if (!IsotopeNode.prototype.map) {
	/**
	 * Handles Nodes map update.
	 *
	 * @param node - The parent Node.
	 * @param items - New items to be mapped.
	 */
	const handleMapUpdate = (node: IsotopeNode, items: MappableItem[]): void => {
		const data = node.mapData!;
		const changes = detectChanges(
			(node.linked as Array<{ id: string | number }>) || [],
			items
		);

		changes.forEach(({ id, item, position = 0, type }, index) => {
			if (type === "add") {
				const child = data.createItem(item, node, index);

				if (child) {
					child.id = `${id}`;
					node.link(child, position);
					child.move(position);
				}
			} else {
				const child = node.linked!.find((linked) => linked.id === id);

				if (child) {
					if (type === "remove") {
						child.remove();
					} else {
						child.move(position);
					}
				}
			}
		});
	};
	/**
	 * Handles the Nodes map creation.
	 *
	 * @param node - The parent Node.
	 * @param items - Items to be mapped.
	 */
	const handleMapCreation = (node: IsotopeNode, items: MappableItem[]): void => {
		const data = node.mapData!;

		items.forEach((item, index) => {
			const child = data.createItem(item, node, index);

			if (child) {
				child.id = `${typeof item === "object" ? item.id : item}`;
				node.link(child);
			}
		});
	};
	/**
	 * Processes the provided Node's map child tree.
	 *
	 * @param node - Node to be processed.
	 */
	const processMap = (node: IsotopeNode): void => {
		if (node.mapData) {
			const data = node.mapData;
			const items: MappableItem[] =
				typeof data.items === "function" ? data.items(node) : node.getState(data.items);

			if (node.linked) {
				handleMapUpdate(node, items);
			} else {
				handleMapCreation(node, items);
			}
		}
	};

	IsotopeNode.prototype.onClean.push((node) => {
		if (node.mapData) {
			node.mapData = null;
		}
	});
	IsotopeNode.prototype.onProcess.push((node) => {
		if (node.mapData) {
			processMap(node);
		}
	});
	Object.assign(IsotopeNode.prototype, {
		/** @private */
		map(
			this: IsotopeNode,
			items: Mappable<any, any>,
			createItem: (item: any, node: IsotopeNode, index: number) => IsotopeNode | void
		): IsotopeNode {
			this.clean();

			if (Array.isArray(items)) {
				items.forEach((item, index) => {
					createItem(item, this, index);
				});
			} else {
				this.mapData = {
					createItem,
					items
				};
				processMap(this);
			}

			return this;
		}
	});
}
