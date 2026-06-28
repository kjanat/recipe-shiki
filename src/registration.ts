import type { LanguageRegistration } from "@shikijs/types";

/**
 * The raw recipe TextMate grammar, minus the Shiki metadata this package sets
 * itself (`name`, `scopeName`, `displayName`) and `aliases`, which it drops —
 * the language has a single identifier, `recipe`. Both entrypoints import a
 * value of this shape from `recipe-tmlanguage`; they differ only in how the
 * grammar is resolved (npm JSON module vs JSR `.ts` module).
 */
export type RecipeGrammar = Omit<LanguageRegistration, "name" | "scopeName" | "displayName" | "aliases">;

/**
 * Wrap the recipe TextMate grammar into a Shiki `LanguageRegistration` array.
 *
 * Shared by the npm (`index.node.ts`) and JSR (`index.deno.ts`) entrypoints so
 * the registration metadata lives in exactly one place.
 *
 * Canonical lang name is `"recipe"`.
 */
export function toRegistration(grammar: RecipeGrammar): LanguageRegistration[] {
	return [{
		...grammar,
		name: "recipe",
		scopeName: "source.recipe",
		displayName: "Recipe",
	}];
}
