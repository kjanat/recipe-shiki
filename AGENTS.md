# recipe-shiki

## OVERVIEW

Thin Shiki language pack wrapping `recipe-tmlanguage`'s generated TextMate
grammar. Default-exports a `LanguageRegistration[]` matching the
`@shikijs/langs/*` shape. Grammar JSON is inlined into `dist/index.js` at build
time — no runtime dep on `recipe-tmlanguage`.

## WHERE TO LOOK

| Task                    | Location                                           | Notes                                     |
| ----------------------- | -------------------------------------------------- | ----------------------------------------- |
| Wrap grammar for Shiki  | `src/index.ts`                                     | Spreads grammar, overrides name + aliases |
| Build config            | `tsdown.config.ts`                                 | rolldown-based, inlines JSON              |
| Upstream grammar source | `../recipe-tmlanguage/dist/recipe.tmLanguage.json` | Consumed via `"module"` field             |
| Published artifact      | `dist/index.js` + `dist/index.d.ts`                | Regenerated via `prepack`                 |

## SOURCE OF TRUTH

- Grammar content lives in `recipe-tmlanguage`. This package MUST NOT duplicate
  vocab or patterns.
- Shiki-specific metadata (canonical `name: "recipe"`, `aliases`, `displayName`)
  lives in `src/index.ts`.

## CONVENTIONS

- `recipe-tmlanguage` is consumed via Bun link:

```bash
cd ../recipe-tmlanguage && bun link
cd ../recipe-shiki && bun link recipe-tmlanguage && bun install
```

- Bare import `recipe-tmlanguage` resolves to its grammar JSON via the
  `"module"` field. Do NOT hand-write `recipe-tmlanguage/dist/...` paths.
- tsdown inlines the JSON at build — `dist/index.js` has no runtime import of
  `recipe-tmlanguage`.

## COMMANDS

```bash
bun install
bun run typecheck
bun run build
bun run fmt
```

## ANTI-PATTERNS

- Do not hand-edit grammar content here; change it upstream in
  `recipe-tmlanguage` and rebuild.
- Do not add runtime deps. This package should be build-only consumption of
  `recipe-tmlanguage` + peer `shiki`.
- Do not drop `aliases` without a major version bump — downstream code uses
  them.
- Do not add subpath exports unless Shiki grows multi-variant support for a
  single language.

## CHANGE CHECKLIST

- Upstream grammar changed: bump `recipe-tmlanguage` devDep, rebuild, diff
  `dist/index.js`, bump this package's version.
- Shiki majors: test against the new `@shikijs/types` shape; update
  `peerDependencies` range.
