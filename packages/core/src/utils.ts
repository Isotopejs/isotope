interface Change {
	id: SimpleItem;
	item?: Item;
	position?: number;
	type: "add" | "remove" | "move";
}

interface DiffingData {
	changes: Change[];
	index: number;
	source: SimpleItem[];
	sourceInput: Item[];
	target: SimpleItem[];
	targetInput: Item[];
}

interface MoveData {
	left: SimpleItem | null;
	right: SimpleItem | null;
}

type SimpleItem = string | number;

type Item = string | number | { id: string | number };

/**
 * Creates the Diffing loop data object.
 *
 * @param sourceInput - Original, source Item array.
 * @param targetInput - Target Item array.
 * @returns - Diffing loop data object.
 */
const createData = (sourceInput: Item[], targetInput: Item[]): DiffingData => ({
	changes: [],
	index: 0,
	source: sourceInput.map((item) => `${typeof item === "object" ? item.id : item}`),
	sourceInput,
	target: targetInput.map((item) => `${typeof item === "object" ? item.id : item}`),
	targetInput
});
/**
 * Checks if the diffing loop should be run.
 *
 * @param data - Diffing loop data.
 * @returns - If the diffing loop should be run.
 */
const shouldLoop = ({ index, source, target }: DiffingData): boolean => {
	return (
		source.length > 0 &&
		target.length > 0 &&
		(index <= source.length || index <= target.length)
	);
};
/**
 * Trims the diffed arrays from both sides if edge items are equal.
 *
 * @param data - Diffing loop data.
 * @returns - If arrays were trimmed.
 */
const trim = ({ source, target }: DiffingData): boolean => {
	const [sourceStart] = source;
	const sourceEnd = source[source.length - 1];
	const [targetStart] = target;
	const targetEnd = target[target.length - 1];

	let trimmed = false;

	if (sourceStart === targetStart) {
		source.shift();
		target.shift();
		trimmed = true;
	}

	if (sourceEnd === targetEnd) {
		source.pop();
		target.pop();
		trimmed = true;
	}

	return trimmed;
};
/**
 * Detect whether the items should be moved to the opposite site of the array.
 *
 * @param data - Diffing loop data.
 * @returns - Which item should be moved to left and which to right.
 */
const prepareMove = ({ index, source, target }: DiffingData): MoveData => {
	const sourceStart = source[index];
	const sourceEnd = source[source.length - 1 - index];
	const [targetStart] = target;
	const targetEnd = target[target.length - 1];
	const moveLeft = sourceEnd === targetStart;
	const moveRight = sourceStart === targetEnd;
	const itemToLeft = moveLeft ? source.splice(source.length - 1 - index, 1)[0] : null;
	const itemToRight = moveRight ? source.splice(index, 1)[0] : null;

	return {
		left: itemToLeft,
		right: itemToRight
	};
};
/**
 * Move the specified items to the opposite site of the array.
 *
 * @param data - Diffing loop data.
 * @param itemToLeft - Item to be moved to the left end.
 * @param itemToRight - Item to be moved to the right end.
 */
const move = (
	{ changes, source }: DiffingData,
	itemToLeft: SimpleItem | null,
	itemToRight: SimpleItem | null
): void => {
	if (itemToRight !== null) {
		source.push(itemToRight);
		changes.push({
			id: itemToRight,
			type: "move"
		});
	}

	if (itemToLeft !== null) {
		source.splice(0, 0, itemToLeft);
		changes.push({
			id: itemToLeft,
			type: "move"
		});
	}
};
/**
 * Adds the new items from diffed arrays.
 *
 * @param data - Diffing loop data.
 */
const add = ({ changes, target }: DiffingData): void => {
	target.splice(0).forEach((id) => {
		changes.push({
			id,
			type: "add"
		});
	});
};
/**
 * Removes the previous items from diffed arrays.
 *
 * @param data - Diffing loop data.
 */
const remove = ({ changes, source }: DiffingData): void => {
	source.splice(0).forEach((id) => {
		changes.push({
			id,
			type: "remove"
		});
	});
};
/**
 * Fills the remaining data required by specific changes.
 *
 * @param data - Diffing loop data.
 */
const fill = ({ changes, targetInput }: DiffingData): void => {
	changes.forEach((change) => {
		const id = `${change.id}`;
		const { type } = change;

		if (type === "add" || type === "move") {
			const index = targetInput.findIndex((item) => {
				return typeof item === "object" ? `${item.id}` === id : `${item}` === id;
			});

			if (type === "add") {
				change.item = targetInput[index];
			}

			change.position = index;
		}
	});
};
/**
 * Detects changes made between 2 Item arrays.
 *
 * @param sourceInput - Original, source Item array.
 * @param targetInput - Target Item array.
 * @returns - Changes that differ the second array from the first one.
 */
const detectChanges = (sourceInput: Item[], targetInput: Item[]): Change[] => {
	const data = createData(sourceInput, targetInput);

	while (shouldLoop(data)) {
		if (trim(data)) {
			data.index = 0;
			continue;
		}

		const { left, right } = prepareMove(data);

		if (left !== null || right !== null) {
			move(data, left, right);
			data.index = 0;
		} else {
			data.index += 1;
		}
	}

	add(data);
	remove(data);
	fill(data);

	return data.changes;
};

export { detectChanges };
