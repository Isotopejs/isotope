import { createUtil } from "../util";
const maxWXs = createUtil({ maxWidth: "20rem" });
const maxWSm = createUtil({ maxWidth: "24rem" });
const maxWMd = createUtil({ maxWidth: "28rem" });
const maxWLg = createUtil({ maxWidth: "32rem" });
const maxWXl = createUtil({ maxWidth: "36rem" });
const maxW2xl = createUtil({ maxWidth: "42rem" });
const maxW3xl = createUtil({ maxWidth: "48rem" });
const maxW4xl = createUtil({ maxWidth: "56rem" });
const maxW5xl = createUtil({ maxWidth: "64rem" });
const maxW6xl = createUtil({ maxWidth: "72rem" });
const maxWFull = createUtil({ maxWidth: "100%" });
const maxWScreenSm = createUtil(({ breakpoints }) => ({
    maxWidth: `${breakpoints.sm}px`
}));
const maxWScreenMd = createUtil(({ breakpoints }) => ({
    maxWidth: `${breakpoints.md}px`
}));
const maxWScreenLg = createUtil(({ breakpoints }) => ({
    maxWidth: `${breakpoints.lg}px`
}));
const maxWScreenXl = createUtil(({ breakpoints }) => ({
    maxWidth: `${breakpoints.xl}px`
}));
const maxWNone = createUtil({ maxWidth: "none" });
export { maxWXs, maxWSm, maxWMd, maxWLg, maxWXl, maxW2xl, maxW3xl, maxW4xl, maxW5xl, maxW6xl, maxWFull, maxWScreenSm, maxWScreenMd, maxWScreenLg, maxWScreenXl, maxWNone };
//# sourceMappingURL=max-width.js.map