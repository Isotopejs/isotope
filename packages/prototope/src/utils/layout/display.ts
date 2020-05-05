import { Properties } from "csstype";
import { createUtil } from "../util";

/**
 * Creates CSS properties object with display property.
 *
 * @param display - Display CSS property value.
 * @returns - CSS properties object.
 */
const display = (display: string): Properties<string> => ({ display });
const hidden = createUtil(display("none"));
const block = createUtil(display("block"));
const inlineBlock = createUtil(display("inline-block"));
const inline = createUtil(display("inline"));
const flex = createUtil(display("flex"));
const inlineFlex = createUtil(display("inline-flex"));
const grid = createUtil(display("grid"));
const table = createUtil(display("table"));
const tableCaption = createUtil(display("table-caption"));
const tableCell = createUtil(display("table-cell"));
const tableColumn = createUtil(display("table-column"));
const tableColumnGroup = createUtil(display("table-column-group"));
const tableFooterGroup = createUtil(display("table-footer-group"));
const tableHeaderGroup = createUtil(display("table-header-group"));
const tableRowGroup = createUtil(display("table-row-group"));
const tableRow = createUtil(display("table-row"));

export {
	hidden,
	block,
	inlineBlock,
	inline,
	flex,
	inlineFlex,
	grid,
	table,
	tableCaption,
	tableCell,
	tableColumn,
	tableColumnGroup,
	tableFooterGroup,
	tableHeaderGroup,
	tableRowGroup,
	tableRow
};
