# Assets

Assets in Docking are simply static files that are meant to be referenced throughout your codebase. They're placed inside the `assets` folder and copied directly to the output `dist`.

## Referencing

Similarly to [config options](./configuration.md), assets should be referenced with special `asset:` prefix, followed by a `assets`-relative path to allow Docking to resolve them during processing.

```markdown
Example [resource link](asset:documents/text.txt).
```

The same method can be used to reference assets' paths in all the Markdown content files, JS/TS component files and `template.html`
