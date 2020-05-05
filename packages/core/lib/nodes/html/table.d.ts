import { Child } from "./register";
declare module "../../node" {
    interface IsotopeNode {
        caption: Child;
        col: Child;
        colgroup: Child;
        table: Child;
        tbody: Child;
        td: Child;
        tfoot: Child;
        th: Child;
        thead: Child;
        tr: Child;
    }
}
