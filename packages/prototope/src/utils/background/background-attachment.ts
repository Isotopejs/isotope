import { createUtil } from "../util";

const bgFixed = createUtil({ backgroundAttachment: "fixed" });
const bgLocal = createUtil({ backgroundAttachment: "local" });
const bgScroll = createUtil({ backgroundAttachment: "scroll" });

export { bgFixed, bgLocal, bgScroll };
