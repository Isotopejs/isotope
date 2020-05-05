<p align="center">
  <img src="./packages/core/logo.png" height="100">
</p>
<h1 align="center"><b>Isotope Ecosystem</b></h1>

![CI](https://github.com/Isotope-js/isotope/workflows/CI/badge.svg) ![Codecov](https://img.shields.io/codecov/c/github/Isotope-js/isotope) ![Discord](https://img.shields.io/discord/707157754766426134)

Isotope is a UI library that aims to bring simplicity and intuitiveness back to Web Development.

```javascript
import { createDOMView } from "@isotope/core";

const SaySth = (message) => (node) => {
  node
    .span({
      styles: {
        color: "orange",
        fontSize: "4rem",
        fontWeight: "bold",
      },
    })
    .text(message);
};
const view = createDOMView(document.body);

view.$(SaySth("Hello World!"));
```

This is a monorepo housing all official libraries and tools that belong to the Isotope ecosystem. For more information about each package, consult the following table.

| Package                                         | Description                                                                                   | Website                                                                            |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| [Core](./packages/core)                         | This is the core Isotope UI library that forms the basis for all the other tools in this repo | [https://areknawo.com/isotope](https://areknawo.com/isotope)                       |
| [Server](./packages/server)                     | A package that enables Isotope to be used for Server-Side Rendering (SSR)                     | [https://areknawo.com/isotope#docs>ssr](https://areknawo.com/isotope#docs%3Essr)   |
| [Prototope](./packages/prototope)               | The Prototope utility library for UI CSS-based prototyping with Isotope                       | [https://areknawo.com/prototope](https://areknawo.com/prototope)                   |
| [Prototope Server](./packages/prototope-server) | A packages that enables Prototope to generate CSS server-side                                 | [https://areknawo.com/prototope/docs>ssr](https://areknawo.com/prototope/docs>ssr) |
| [Docking](./packages/docking)                   | Simplistic Markdown-based Static Site Generator (SSG) levraging the Isotope ecosystem         | [https://areknawo.com/docking](https://areknawo.com/docking)                       |
