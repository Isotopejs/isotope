import { createUtil } from "../util";

const whitespaceNormal = createUtil({ whiteSpace: "normal" });
const whitespaceNoWrap = createUtil({ whiteSpace: "nowrap" });
const whitespacePre = createUtil({ whiteSpace: "pre" });
const whitespacePreLine = createUtil({ whiteSpace: "pre-line" });
const whitespacePreWrap = createUtil({ whiteSpace: "pre-wrap" });

export {
	whitespaceNormal,
	whitespaceNoWrap,
	whitespacePre,
	whitespacePreLine,
	whitespacePreWrap
};
