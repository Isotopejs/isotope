import { Child } from "./register";
declare module "../../node" {
    interface IsotopeNode {
        details: Child;
        dialog: Child;
        menu: Child;
        summary: Child;
        canvas: Child;
        script: Child;
        noscript: Child;
        slot: Child;
        template: Child;
    }
}
