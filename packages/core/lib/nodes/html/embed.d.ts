import { Child } from "./register";
declare module "../../node" {
    interface IsotopeNode {
        embed: Child;
        iframe: Child;
        object: Child;
        param: Child;
        picture: Child;
        source: Child;
    }
}
