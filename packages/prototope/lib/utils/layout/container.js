import { createUtil } from "../util";
const container = createUtil((config, { breakpoint }) => ({
    width: breakpoint ? `${config.breakpoints[breakpoint]}px` : "100%"
}));
export { container };
//# sourceMappingURL=container.js.map