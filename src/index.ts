/**
 * # Shiki grammar for the Recipe pharmacological notation language.
 *
 * Provides a `LanguageRegistration` array that registers `.recipe` / `.rx`
 * syntax highlighting with any Shiki-compatible highlighter.
 *
 * ## Basic usage with Shiki
 * ```ts
 * import { createHighlighter } from "shiki";
 * import recipe from "jsr:@kjanat/recipe-shiki"; // or "recipe-shiki" (future npm package)
 *
 * const highlighter = await createHighlighter({
 *   langs: [recipe],
 *   themes: ["vitesse-dark"],
 * });
 *
 * const html = highlighter.codeToHtml(`Rp/ Amoxicilline 500mg`, {
 *   lang: "recipe",
 *   theme: "vitesse-dark",
 * });
 * ```
 *
 * ## Nuxt Content integration
 * ```ts
 * // nuxt.config.ts
 * import recipe from "jsr:@kjanat/recipe-shiki";
 *
 * export default defineNuxtConfig({
 *   content: {
 *     build: {
 *       markdown: {
 *         highlight: {
 *           langs: [recipe],
 *         },
 *       },
 *     },
 *   },
 * });
 * ```
 *
 * @module
 */

import type { LanguageRegistration } from "@shikijs/types";
import grammar from "recipe-tmlanguage" with { type: "json" };

/**
 * Shiki language registration for Recipe (`.recipe` / `.rx`).
 *
 * Pass directly to `langs` in `import("shiki").createHighlighter`\
 * or any framework integration that accepts a `LanguageRegistration` array.
 *
 * Canonical lang name is `"recipe"`, and alias `"rx"`.
 */
const recipe: LanguageRegistration[] = [{
	...grammar,
	name: "recipe",
	scopeName: "source.recipe",
	displayName: "Recipe",
	aliases: ["rx"],
}];

export default recipe;
export { recipe };
