# Installation

There are 2 ways to install Prototope:

## 1. CDN

If you're planning on simply trying out Prototope, you might make use of **Content Delivery Network** (CDN). To do this, include the following tag in the `<head>` of your HTML file:

```html
<script src="https://cdn.jsdelivr.net/npm/@isotope/prototope@latest"></script>
```

With this setup, you can access all of Prototope's goodness under the global `Prototope` namespace.

## 2. NPM (recommended)

Although using CDN is quick and easy, for any serious projects, it's highly recommended that you utilize [NPM](https://www.npmjs.com). It'll allow you to use only the required parts of the library (thus reducing the bundle size) and utilize special tooling such as [TypeScript](./typescript.md).

If you're using **NPM** Use the following command to install the package:

```bash
npm i @isotope/prototope
```

Or, if you're using **Yarn**:

```bash
yarn add @isotope/prototope
```

After that, you should be able to utilize the library in your project by simply importing it (ES6-style):

```javascript
import { bgColor } from "@isotope/prototope";
```

### Tree-shaking

If your bundler doesn't support tree-shaking or it doesn't work properly, you can import the required parts of the library straight from the `lib` and its sub-folders:

```javascript
import { bgColor } from "@isotope/prototope/lib/utils/background";
```

When you're all set and done, you can start learning Prototope, beginning with the [setup](./setup.md).
