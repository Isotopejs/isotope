import { Properties } from "csstype";
import { createUtil } from "../util";

const antialiased = createUtil({
	MozOsxFontSmoothing: "grayscale",
	WebkitFontSmoothing: "antialiased"
} as Properties<string>);
const subpixelAntialiased = createUtil({
	MozOsxFontSmoothing: "auto",
	WebkitFontSmoothing: "auto"
} as Properties<string>);

export { antialiased, subpixelAntialiased };
