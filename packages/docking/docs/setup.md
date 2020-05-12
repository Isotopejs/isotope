# Setup

Docking is extremely easy to set up. After installing, all you need to do is set up the proper folder structure, run a command and you're ready to go!

## Structure

For the sake of simplicity, Docking uses an opinionated folder structure. Starting from the top-level folder, where you'll run docking commands, here are all the sub-directories and their use-cases:

- `assets` - folder containing static assets that get copied directly into the output folder.
- `components` - folder containing Isotope components meant to be used in template and Markdown content files.
- `content` - folder containing all the Markdown content files meant to be processed into corresponding HTML pages.
- `template.html` (required) - HTML file meant as a template to insert every processed Markdown page into. It should contain content you wish to include in every page, including `<html>`, `<head>` and `<body>` tags.
- `docking.json/.ts/.js` - File containing Docking configuration.

## Building

With the proper setup in place, you can build your website using `dck build` command:

```bash
dck build
```

After the command finishes without any errors, you should be able to find your static website, ready to deploy in the `dist` folder.

## Watching

For development purposes, Docking provides you with yet another command: `dck watch`.

```bash
dck watch
```

When used, the command will first commission an initial build. Then, it'll start the development server and watch and refresh on any changes.

> WARN: Keep in mind that the `dck watch` command has a few limitations:
>
> Both `template.html` as well as the config file aren't watched and thus, changing them will require you to restart the command.
>
> Components are rebuilt only when either their main file changes or when one of their directory's sub-file changes. Rebuilds can't be triggered by other components nor external dependent-upon files. Read [components section](./components.md) for more details.
