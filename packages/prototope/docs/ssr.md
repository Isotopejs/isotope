# Server-Side Rendering

For Prototope, support for SSR means the ability to output the generated CSS rules to a string. This can be later placed in an HTML or CSS file and sent to the client.

For this functionality, Prototope relies upon an external package named `@isotope/prototope-server`, so be sure to have it installed as well.

## PrototopeServer(config)

`PrototopeServer()` is an Isotope component, that works and behaves just like the usual [`Prototope()`](./setup.md) component from the basic `@isotope/prototope` package. Under-the-hood, however, it operates on strings rather than CSS stylesheets.

```javascript
import { PrototopeServer } from "@isotope/prototope-server";
import { createStringView } from "@isotope/server";

const view = createStringView(tag);
const { node, getCSS } = view.$(PrototopeServer());
```

## Client-side

Prototope works by creating dynamic CSS class names that are applied to given Isotope nodes. These class names are configured on-the-go and have random names, making them impossible to collide with hand-written class names.

However, because of that, it's usually the case that you'd like to keep them either client or server-side only. Rendering styles on the server and then reapplying them on the client will cause potentially unnecessary duplication.
