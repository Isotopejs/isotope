# Compatibility

Isotope is targeted towards relatively **modern browsers**. Thus, it officially supports only the browsers that support the [ECMAScript 2015 (ES6)](https://caniuse.com/#feat=es6) standard, which is about **93%** of the market.

## Older browsers

With that said, with additional setup, you can get Isotope to work on older browsers. In order to do so, you should utilize a tool like [Babel](https://babeljs.io/) to **transpile** and **polyfill** certain language features and APIs used by Isotope. Most notably:

- `Object.assign()`
- spread operator (`...`)
- arrow functions (`() => {}`)
- `Array.prototype.includes()` method
- `Array.prototype.find()` method
- `Array.prototype.findIndex()` method
- template literals
- `let` and `const`
- `Element.classList` property with its methods:
  - `contains()`
  - `remove()`
  - `add()`

> WARN: With the proper setup in place, you should be able to support even **IE 9**. But keep in mind that because these browsers aren't officially supported, related issues have lower priority.
