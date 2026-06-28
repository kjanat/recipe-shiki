/**
 * # Shiki grammar for the Recipe pharmacological notation language (JSR).
 *
 * Provides a `LanguageRegistration` array that registers `.recipe`
 * syntax highlighting with any Shiki-compatible highlighter. This is the JSR
 * entrypoint: it resolves the grammar from `jsr:@kjanat/recipe-tmlanguage`
 * (whose `.` export is a module re-exporting the grammar, so no JSON import
 * attribute is needed).
 *
 * ## Basic usage with Shiki
 * ```ts
 * import { createHighlighter } from "shiki";
 * import recipe from "jsr:@kjanat/recipe-shiki";
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
// @ts-nocheck

import grammar from "jsr:@kjanat/recipe-tmlanguage@^0.3.5";
import { toRegistration } from "./registration.ts";

/**
 * Shiki language registration for Recipe (`.recipe`).
 *
 * Pass directly to `langs` in `import("shiki").createHighlighter`\
 * or any framework integration that accepts a `LanguageRegistration` array.
 */
export const recipe: ReturnType<typeof toRegistration> = toRegistration(grammar);
export default recipe;
