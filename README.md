<p align="center">
  <img src="./logo.png" height="100">
</p>
<h1 align="center"><b>Isotope</b></h1>

**Isotope** is a JavaScript-centric, **statically-dynamic** library for building User Interfaces (UIs) for modern browsers.

## Why Isotope?

- **Developer-friendly** - Isotope API is designed with simplicity in mind, so that you can jump right into making your first app. ❤
- **JavaScript-focused** - Isotope is laser-focused on JavaScript, requiring no additional tooling to get you up & running.
- **TypeScript-ready** - Isotope is written in TypeScript, enabling autocompletion and other useful features in modern editors.
- **Lightweight** - Isotope is modular, but even when fully-loaded, it weights only 10.2KB, or 3.4KB with GZip! 📦
- **Fast** - By using reactivity only when needed, Isotope provides performance unrivaled by many. ⚡

```javascript
import { createDOMView } from "@isotope/core";

const why = [
    "Developer-friendly",
    "JavaScript-focused",
    "TypeScript-ready",
    "Lightweight",
    "Fast"
];
const view = createDOMView(document.getElementById("app"));

view.ul().map(why, (text, parent) => {
    parent.li(text);
});
```

## Interested?

Get started by checking out the [docs](https://areknawo.com/isotope).

## Questions?

Have a question or want to chat about Isotope? If so, check out the [Spectrum community](https://spectrum.chat/isotope)!
