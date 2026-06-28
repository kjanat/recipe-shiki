/**
 * # Shiki grammar for the Recipe pharmacological notation language (npm).
 *
 * Provides a `LanguageRegistration` array that registers `.recipe`
 * syntax highlighting with any Shiki-compatible highlighter. This is the npm
 * entrypoint: it resolves the grammar from the `recipe-tmlanguage` npm package
 * (whose `.` export is the raw `.tmLanguage.json`).
 *
 * ## Basic usage with Shiki
 * ```ts
 * import { createHighlighter } from "shiki";
 * import recipe from "recipe-shiki";
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
 * @module
 */

import grammar from "recipe-tmlanguage" with { type: "json" };
import { toRegistration } from "./registration.ts";

/**
 * Shiki language registration for Recipe (`.recipe`).
 *
 * Pass directly to `langs` in `import("shiki").createHighlighter`\
 * or any framework integration that accepts a `LanguageRegistration` array.
 */
export const recipe: ReturnType<typeof toRegistration> = toRegistration(grammar);

export default recipe;
