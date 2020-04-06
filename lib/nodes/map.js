import { IsotopeNode } from "../node";
import { detectChanges } from "../utils";
if (!IsotopeNode.prototype.map) {
    /**
     * Handles Nodes map update.
     *
     * @param node - The parent Node.
     * @param items - New items to be mapped.
     */
    const handleMapUpdate = (node, items) => {
        const data = node.mapData;
        const changes = detectChanges(node.linked || [], items);
        changes.forEach(({ id, item, position = 0, type }, index) => {
            if (type === "add") {
                const child = data.createItem(item, node, index);
                if (child) {
                    child.id = `${id}`;
                    node.link(child, position);
                    child.move(position);
                }
            }
            else {
                const child = node.linked.find((linked) => linked.id === id);
                if (child) {
                    if (type === "remove") {
                        child.remove();
                    }
                    else {
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
    const handleMapCreation = (node, items) => {
        const data = node.mapData;
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
    const processMap = (node) => {
        if (node.mapData) {
            const data = node.mapData;
            const items = typeof data.items === "function" ? data.items(node) : node.getState(data.items);
            if (node.linked) {
                handleMapUpdate(node, items);
            }
            else {
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
        map(items, createItem) {
            this.clean();
            if (Array.isArray(items)) {
                items.forEach((item, index) => {
                    createItem(item, this, index);
                });
            }
            else {
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
//# sourceMappingURL=map.js.map