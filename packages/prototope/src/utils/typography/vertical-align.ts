import { createUtil } from "../util";

const alignBaseline = createUtil({ verticalAlign: "baseline" });
const alignTop = createUtil({ verticalAlign: "top" });
const alignMiddle = createUtil({ verticalAlign: "middle" });
const alignBottom = createUtil({ verticalAlign: "bottom" });
const alignTextTop = createUtil({ verticalAlign: "text-top" });
const alignTextBottom = createUtil({ verticalAlign: "text-bottom" });

export {
	alignBaseline,
	alignTop,
	alignMiddle,
	alignBottom,
	alignTextTop,
	alignTextBottom
};
