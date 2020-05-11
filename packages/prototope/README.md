<p align="center">
  <img src="https://github.com/Isotope-js/isotope/raw/master/packages/prototope/logo.png" height="100">
</p>
<h1 align="center"><b>Prototope</b></h1>

[![npm (scoped)](https://img.shields.io/npm/v/@isotope/prototope)](https://www.npmjs.com/package/@isotope/prototope) [![npm](https://img.shields.io/npm/dm/@isotope/prototope)](https://www.npmjs.com/package/@isotope/prototope) [![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@isotope/prototope)](https://bundlephobia.com/result?p=@isotope/prototope) [![Discord](https://img.shields.io/discord/707157754766426134)](https://discord.gg/FaFbaSk)

**Prototope** is an [Isotope](https://github.com/Isotope-js/core)-based JavaScript library for speedy UI prototyping.

Why Prototope?

- **Innovative CSS-in-JS** - Prototope bring util-first styling approach to JavaScript.
- **Isotope-based** - Prototope is based on Isotope - fast & lightweight UI library - to utilize its simple API and powerful capabilities.
- **Simple** - Prototope's API is simple, and utility-based, allowing you to learn it and build your app in a matter of minutes!
- **TypeScript-ready** - Prototope is written in TypeScript, enabling autocompletion and other useful features in modern editors.

Interested? Get started by checking out the [docs](https://areknawo.com/prototope).

> Prototope is inspired by Tailwind, if you're looking for a CSS equivalent of Prototope, check out [Tailwind](https://github.com/tailwindcss/tailwindcss)

## Installation

```bash
npm install @isotope/prototope
```

## Usage

```javascript
import { Prototope, bgColor, h, w } from "@isotope/prototope";
import { createDOMView } from "@isotope/core";

const view = createDOMView(document.getElementById("app"));
const { node } = view.$(Prototope());
const box = node.div([bgColor("primary"), h(8), w(8)]);
```

## Interested?

Get started by checking out the [docs](https://areknawo.com/prototope).

## Questions?

Have a question or want to chat about Prototope? If so, check out the [Discord community](https://discord.gg/FaFbaSk)!

## Support Prototope

Help make Prototope better by contributing code or fixes, or donating:

<a href="https://www.buymeacoffee.com/areknawo" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/lato-orange.png" alt="Buy Me A Coffee" style="height: 51px !important;width: 217px !important;" ></a>
