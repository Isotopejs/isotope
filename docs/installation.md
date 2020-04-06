# Installation

Isotope is a JS-only library and thus, its installation process is really straight-forward.

There are 2 ways to install the library:

## 1. CDN

If you're planning on simply trying out Isotope, you might make use of **Content Delivery Network** (CDN). To do this, include the following tag in the `<head>` of your HTML file:

```html
<script src="https://cdn.jsdelivr.net/npm/@isotope/core@latest"></script>
```

With this setup, you can access the entire Isotope library under the global `Isotope` namespace.

## 2. NPM (recommended)

Although using CDN is quick and easy, for more advanced projects, it's recommended that you utilize [NPM](https://www.npmjs.com). It'll allow you to use only the required parts of the library (thus reducing the bundle size) and utilize special tooling such as [TypeScript](./typescript.md).

If you're using **NPM** Use the following command to install the package:

```bash
npm i @isotope/core
```

Or, if you're using **Yarn**:

```bash
yarn add @isotope/core
```

After that, you should be able to utilize the library in your project by importing it (ES6-style):

```javascript
import { createDOMView } from "@isotope/core";
```

Or, if you're on Node.js and utilizing Server-Side Rendering ([SSR](./ssr.md)), you can also use `require()`:

```javascript
const { createStringView } = require("@isotope/core");
```

### Tree-shaking

If your bundler doesn't support tree-shaking or it doesn't work properly, you can import the required parts of the library straight from the `lib` folder:

```javascript
import { createDOMView } from "@isotope/core/lib/views/dom";
```

When you're all set and done, you can start learning Isotope, beginning with the concept of [views](./views.md).
