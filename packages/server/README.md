# Isotope Server-Side Rendering

[![npm (scoped)](https://img.shields.io/npm/v/@isotope/server)](https://www.npmjs.com/package/@isotope/server) [![npm](https://img.shields.io/npm/dm/@isotope/server)](https://www.npmjs.com/package/@isotope/server) [![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@isotope/server)](https://bundlephobia.com/result?p=@isotope/server) [![Discord](https://img.shields.io/discord/707157754766426134)](https://discord.gg/FaFbaSk)

This package contain code for Isotope's SSR renderer implementation ([`@isotope/server`](https://www.npmjs.com/package/@isotope/server)). For more details about its usage, check out [the docs](https://areknawo.com/isotope#docs>ssr).

## Installation

```bash
npm install @isotope/server
```

## Usage

```javascript
import { createStringView } from "@isotope/server";

const view = createStringView("body");

view.div();

const str = `${view}`; // <body><div></div></body>
```
