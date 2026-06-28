# recipe-shiki

[![NPM](https://img.shields.io/npm/v/recipe-shiki?logo=npm&labelColor=CB3837&color=black)][npm]
[![JSR](https://img.shields.io/jsr/v/@kjanat/recipe-shiki?logoColor=083344&logo=jsr&logoSize=auto&label=&labelColor=f7df1e&color=black)][jsr]

[Shiki] language pack for the [recipe] pharmacological notation
language. Thin wrapper around [`recipe-tmlanguage`][tmlang]'s generated
TextMate grammar, shaped to match `@shikijs/langs/*` so it drops into any
Shiki highlighter — including fine-grained bundles for tiny client payloads.

## Install

```sh
bun add -D recipe-shiki shiki
# or
npm i -D recipe-shiki shiki
# or, on Deno / from JSR
deno add jsr:@kjanat/recipe-shiki npm:shiki
```

`shiki` is a peer dependency — bring your own version (`>=3`).

## Usage

### Fine-grained bundle (recommended for browsers)

```ts
import { createHighlighterCore } from "shiki/core";
import { createOnigurumaEngine } from "shiki/engine/oniguruma";

const shiki = await createHighlighterCore({
  themes: [import("@shikijs/themes/github-dark")],
  langs: [import("recipe-shiki")],
  engine: createOnigurumaEngine(import("shiki/wasm")),
});

const html = shiki.codeToHtml(source, {
  lang: "recipe",
  theme: "github-dark",
});
```

### Full bundle

```ts
import recipe from "recipe-shiki";
import { createHighlighter } from "shiki";

const shiki = await createHighlighter({
  themes: ["github-dark"],
  langs: recipe,
});

const html = shiki.codeToHtml(source, {
  lang: "recipe",
  theme: "github-dark",
});
```

### Shorthand

```ts
import recipe from "recipe-shiki";
import { codeToHtml } from "shiki";

const html = await codeToHtml(source, {
  lang: recipe[0],
  theme: "github-dark",
});
```

## Scopes

All scopes end in `.recipe` and follow standard TextMate namespaces
(`keyword.control.*`, `support.function.*`, `invalid.illegal.*`, …), so
every mainstream Shiki theme paints recipe blocks without extra config.
Full scope map: see [`recipe-tmlanguage`][tmlang-scopes]'s README.

## Versioning

The grammar is **not** bundled in — `recipe-tmlanguage` is a runtime
dependency. The npm build keeps a live `import … with { type: "json" }`
against the `recipe-tmlanguage` npm package; the JSR build imports
`jsr:@kjanat/recipe-tmlanguage`. Bumping the grammar means bumping the
`recipe-tmlanguage` dependency (and this package).

## License

[MIT][License] © Kaj Kowalski

[recipe]: https://github.com/kjanat/tree-sitter-recipe
[shiki]: https://shiki.style
[tmlang]: https://github.com/kjanat/recipe-tmlanguage
[tmlang-scopes]: https://github.com/kjanat/recipe-tmlanguage#scope-map
[License]: LICENSE
[jsr]: https://jsr.io/@kjanat/recipe-shiki
[npm]: https://npm.im/recipe-shiki

<!-- markdownlint-disable-file no-hard-tabs -->
