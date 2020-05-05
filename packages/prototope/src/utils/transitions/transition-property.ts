import { createUtil } from "../util";

const transitionNone = createUtil({ transitionProperty: "none" });
const transitionAll = createUtil({ transitionProperty: "all" });
const transition = createUtil({
	transitionProperty:
		"background-color, border-color, color, fill, stroke, opacity, box-shadow, transform"
});
const transitionColors = createUtil({
	transitionProperty: "background-color, border-color, color, fill, stroke"
});
const transitionOpacity = createUtil({ transitionProperty: "opacity" });
const transitionShadow = createUtil({ transitionProperty: "box-shadow" });
const transitionTransform = createUtil({ transitionProperty: "transform" });

export {
	transitionNone,
	transitionAll,
	transition,
	transitionColors,
	transitionOpacity,
	transitionShadow,
	transitionTransform
};
