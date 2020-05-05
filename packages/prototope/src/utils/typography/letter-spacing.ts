import { createUtil } from "../util";

const trackingTighter = createUtil({ letterSpacing: "-0.05em" });
const trackingTight = createUtil({ letterSpacing: "-0.025em" });
const trackingNormal = createUtil({ letterSpacing: "0" });
const trackingWide = createUtil({ letterSpacing: "0.025em" });
const trackingWider = createUtil({ letterSpacing: "0.05em" });
const trackingWidest = createUtil({ letterSpacing: "0.1em" });

export {
	trackingTighter,
	trackingTight,
	trackingNormal,
	trackingWide,
	trackingWider,
	trackingWidest
};
