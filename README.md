# recipe-shiki

[Shiki] language pack for the [recipe] pharmacological notation
language. Thin wrapper around [`recipe-tmlanguage`][tmlang]'s generated
TextMate grammar, shaped to match `@shikijs/langs/*` so it drops into any
Shiki highlighter — including fine-grained bundles for tiny client payloads.

## Install

```sh
bun add -D recipe-shiki shiki
# or
npm i -D recipe-shiki shiki
```

`shiki` is a peer dependency — bring your own version (`>=4`).

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

## Aliases

The grammar registers under `recipe` (canonical) with aliases `rx` and
`rcp`. Any of these work as the `lang` argument.

## Scopes

All scopes end in `.recipe` and follow standard TextMate namespaces
(`keyword.control.*`, `support.function.*`, `invalid.illegal.*`, …), so
every mainstream Shiki theme paints recipe blocks without extra config.
Full scope map: see [`recipe-tmlanguage`'s README][tmlang-scopes].

## Versioning

Grammar content is inlined at build time from the version of
`recipe-tmlanguage` listed in this package's `devDependencies`. Bumping the
grammar means bumping this package.

## License

[MIT][License] © Kaj Kowalski

[recipe]: https://github.com/kjanat/tree-sitter-recipe
[shiki]: https://shiki.style
[tmlang]: https://github.com/kjanat/recipe-tmlanguage
[tmlang-scopes]: https://github.com/kjanat/recipe-tmlanguage#scope-map
[License]: LICENSE

<!-- markdownlint-disable-file no-hard-tabs -->
