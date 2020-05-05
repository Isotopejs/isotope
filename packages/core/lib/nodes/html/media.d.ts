import { Child } from "./register";
declare module "../../node" {
    interface IsotopeNode {
        area: Child;
        audio: Child;
        img: Child;
        track: Child;
        video: Child;
    }
}
