<p align="center">
  <img src="https://github.com/Isotope-js/isotope/raw/master/packages/core/logo.png" height="100">
</p>
<h1 align="center"><b>Isotope</b></h1>

[![npm (scoped)](https://img.shields.io/npm/v/@isotope/core)](https://www.npmjs.com/package/@isotope/core) [![npm](https://img.shields.io/npm/dm/@isotope/core)](https://www.npmjs.com/package/@isotope/core) [![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@isotope/core)](https://bundlephobia.com/result?p=@isotope/core) [![Discord](https://img.shields.io/discord/707157754766426134)](https://discord.gg/FaFbaSk)

**Isotope** is a simple and intuitive pure JS library for building User Interfaces (UIs) for modern browsers.

## Why Isotope?

- **Developer-friendly** - Isotope API is designed with simplicity in mind, so that you can jump right into making your first app. ❤
- **JavaScript-focused** - Isotope is laser-focused on JavaScript, requiring no additional tooling to get you up & running.
- **TypeScript-ready** - Isotope is written in TypeScript, enabling autocompletion and other useful features in modern editors.
- **Lightweight** - Isotope is modular, but even when fully-loaded, it weights only 10.2KB, or 3.4KB with GZip! 📦
- **Fast** - With its small size and memory efficiency, Isotope provides performance unrivaled by many. ⚡

## Installation

```bash
npm install @isotope/core
```

## Usage

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

Have a question or want to chat about Isotope? If so, check out the [Discord community](https://discord.gg/FaFbaSk)!

## Support Isotope

Help make Isotope better by contributing code or fixes, or donating:

<a href="https://www.buymeacoffee.com/areknawo" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/lato-orange.png" alt="Buy Me A Coffee" style="height: 51px !important;width: 217px !important;" ></a>
