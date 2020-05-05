# Isotope Server-Side Rendering

![npm (scoped)](https://img.shields.io/npm/v/@isotope/server) ![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@isotope/server)

This package contain code for Isotope's SSR renderer implementation ([`@isotope/server`](https://www.npmjs.com/package/@isotope/server)). For more details about its usage, check out [the docs](https://areknawo.com/isotope#docs>ssr).

```javascript
import { createStringView } from "@isotope/server";

const view = createStringView("body");

view.div();

const str = `${view}`; // <body><div></div></body>
```
