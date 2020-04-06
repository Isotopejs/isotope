import { Child } from "./register";
declare module "../../node" {
    interface IsotopeNode {
        address: Child;
        article: Child;
        aside: Child;
        footer: Child;
        header: Child;
        h1: Child;
        h2: Child;
        h3: Child;
        h4: Child;
        h5: Child;
        h6: Child;
        hgroup: Child;
        main: Child;
        nav: Child;
        section: Child;
    }
}
