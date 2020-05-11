# Content

Content in Docking is what actually gets parsed and outputted as static web pages. It's a set of Markdown files, located inside the `content` folder.

## Markdown

Within Markdown files, Docking supports [GFM](https://github.github.com/gfm), its custom [component block rules](./components.md), as well as [config](./configuration.md) and [assets](./assets.md) references.

```markdown
# Header

- one
- two
- three

Hello **World**!

[link](config:homepage)

{{ component }}{{ component }}
```

## Syntax highlighting

While processing, Docking automatically highlights your Markdown code blocks (given a proper language is provided) with the help of the [highlight.js](https://highlightjs.org) library. All you need to do is to load highlight.js CSS theme (possibly through static assets and `template.html`/special component insert) and you're ready to go!
