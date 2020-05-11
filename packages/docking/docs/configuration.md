# Configuration

Docking aims for simplicity and ease-of-use. Thus, at its current state, it's only slightly configurable. Apart from the component system, static assets, and Markdown content support, the most important role in Docking customization is played by the config file.

## Config file

Docking config file is a file named `docking.json/js/ts` that is ultimately meant to resolve to a config object that can later be used within Docking.

Docking config can have many forms. Regardless of the file type you use, the config object should be JSON-serializable. If you go with the `.js` or `.ts` file (processed internally with [Babel](https://babeljs.io)), your config is a bit more versatile with the following options:

- a usual object
- a promise that resolves to an object
- a function that returns an object
- a function that returns a promise that resolves to an object.

A function or promise-based config is especially useful when you need to preprocess or load your Markdown content from different sources to the `content` folder.

## Config options

The config file is meant to be a place, where the user can set values, that are meant to be used throughout the whole codebase. However, there are also some options that are meant to configure the behavior of Docking itself.

### `prototope`

The `prototope` property is passed to the Prototope instance used by Docking for server-side-rendered part of the website. Check out [Prototope's documentation](https://areknawo.com/prototope) for more info.

### `cache`

The `cache` property determines whether to enable build cache. If enabled incremental builds won't have to rebuild unchanged files. Keep in mind that when using cache you shouldn't be messing with your `dist` output folder directly. If that happens caching will stop working properly. To fix it, simply remove the created `cache` folder (or only the `cache/docking.json` file).

## Accessing config options

Docking provides an easy and consistent way for you to access your config options throughout your codebase. Simply use the `config:` prefix and specify the path to the specific property, separated with dots.

```markdown
This is [homepage link](config:links.homepage).
```

Above you see an example of accessing the `links.homepage` property within the Markdown content file. In this case our example `docking.json` should look something like this:

```json
{
	"links": {
		"homepage": "https://areknawo.com"
	}
}
```

Keep in mind that you can use the same method to access your config options in Markdown content files, components JS/TS files, and `template.html`. In component files, config references are resolved during the bundling process and result in JSON-stringified value being inserted directly into your code. For working with more complex values, you might find `JSON.parse()` method useful.
