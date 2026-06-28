/// <reference types="bun-types" />
import recipe, { recipe as named } from "#recipki";
import { describe, expect, test } from "bun:test";
import { createHighlighter } from "shiki";

const SNIPPET = "Rp/ Amoxicilline 500mg\nS/ 3 dd 1 tablet";

/** Tokenize `source` with the recipe grammar and return the set of every scope hit. */
async function scopesOf(source: string): Promise<Set<string>> {
	const hl = await createHighlighter({ themes: ["vitesse-dark"], langs: [recipe] });
	// Resolve by the loaded lang name (a `string`, always present) — this dodges
	// both the strict bundled-lang typing on `codeToTokens` and any index guard,
	// and exposes the raw TextMate scopes via `tokenizeLine`.
	const tm = hl.getLanguage("recipe");
	const scopes = new Set<string>();
	let prev: ReturnType<typeof tm.tokenizeLine>["ruleStack"] | null = null;
	for (const line of source.split("\n")) {
		const res = tm.tokenizeLine(line, prev);
		prev = res.ruleStack;
		for (const token of res.tokens) for (const scope of token.scopes) scopes.add(scope);
	}
	hl.dispose();
	return scopes;
}

describe("recipe-shiki", () => {
	const grammar = recipe[0];

	describe("exports", () => {
		test("default export is a one-element LanguageRegistration array", () => {
			expect(recipe).toBeArray();
			expect(recipe).toBeArrayOfSize(1);
			expect(grammar).toBeDefined();
		});

		test("default and named exports are the same reference", () => {
			expect(named).toBe(recipe);
		});
	});

	describe("registration metadata", () => {
		test("canonical name and scope", () => {
			expect(grammar?.name).toBe("recipe");
			expect(grammar?.scopeName).toBe("source.recipe");
			expect(grammar?.scopeName).toStartWith("source.");
			expect(grammar?.displayName).toBe("Recipe");
		});

		test("single identifier — no aliases or embedded langs", () => {
			expect(grammar?.aliases).toBeUndefined();
			expect(grammar?.embeddedLangs ?? []).toBeEmpty();
		});
	});

	describe("grammar (sourced from recipe-tmlanguage)", () => {
		test("carries a non-empty TextMate shape", () => {
			expect(grammar).toContainKeys(["scopeName", "patterns", "repository"]);
			expect(grammar?.patterns).toBeArray();
			expect(grammar?.patterns.length).toBePositive();
			expect(grammar?.repository).toBeObject();
			expect(Object.keys(grammar?.repository ?? {}).length).toBePositive();
		});
	});

	describe("highlighting", () => {
		test("every emitted scope is namespaced under `.recipe`", async () => {
			for (const scope of await scopesOf(SNIPPET)) expect(scope).toEndWith(".recipe");
		});

		test("grammar rules fire: directive and dose are recognised", async () => {
			const scopes = [...(await scopesOf(SNIPPET))];
			expect(scopes).toContain("source.recipe");
			expect(scopes).toSatisfy((s) => s.some((scope) => scope.startsWith("keyword.control")));
			expect(scopes).toSatisfy((s) => s.some((scope) => scope.startsWith("constant.numeric")));
		});

		test("renders distinct themed colours, not flat plaintext", async () => {
			const hl = await createHighlighter({ themes: ["vitesse-dark"], langs: [recipe] });
			// `codeToHtml`'s `lang` is a permissive StringLiteralUnion (accepts a
			// registered custom lang), unlike the strict `codeToTokens` overload.
			const html = hl.codeToHtml(SNIPPET, { lang: "recipe", theme: "vitesse-dark" });
			hl.dispose();

			const colours = new Set<string>();
			for (const match of html.matchAll(/color:(#[0-9a-fA-F]{3,8})/g)) {
				if (match[1] !== undefined) colours.add(match[1].toLowerCase());
			}
			expect(colours.size).toBeGreaterThan(1);
		});

		test("loads under the canonical name only", async () => {
			const hl = await createHighlighter({ themes: ["vitesse-dark"], langs: [recipe] });
			const loaded = hl.getLoadedLanguages();
			hl.dispose();
			expect(loaded).toContain("recipe");
			expect(loaded).not.toContain("rx");
		});
	});
});
