/// <reference types="bun-types" />
import recipe from "#recipki";
import { describe, expect, test } from "bun:test";
import { createHighlighter } from "shiki";

const SNIPPET = "Rp/ Amoxicilline 500mg\nS/ 3 dd 1 tablet";

describe("recipe-shiki language registration", () => {
	const [grammar] = recipe;
	if (grammar === undefined) throw new Error("recipe registration is empty");

	test("default export is a single LanguageRegistration", () => {
		expect(Array.isArray(recipe)).toBe(true);
		expect(recipe).toHaveLength(1);
	});

	test("registration metadata", () => {
		expect(grammar.name).toBe("recipe");
		expect(grammar.scopeName).toBe("source.recipe");
		expect(grammar.aliases).toContain("rx");
		expect(grammar.displayName).toBe("Recipe");
	});

	test("grammar is sourced from recipe-tmlanguage (non-empty)", () => {
		expect(Array.isArray(grammar.patterns)).toBe(true);
		expect(grammar.patterns.length).toBeGreaterThan(0);
		expect(Object.keys(grammar.repository ?? {}).length).toBeGreaterThan(0);
	});

	test("Shiki highlights .recipe source with multiple scopes (not plaintext)", async () => {
		const hl = await createHighlighter({ themes: ["vitesse-dark"], langs: [recipe] });
		// `codeToHtml`'s `lang` is a permissive StringLiteralUnion (accepts the
		// registered custom lang), unlike the strict `codeToTokens` overload.
		const html = hl.codeToHtml(SNIPPET, { lang: "recipe", theme: "vitesse-dark" });
		hl.dispose();

		const colors = new Set<string>();
		for (const m of html.matchAll(/color:(#[0-9a-fA-F]{3,8})/g)) {
			if (m[1] !== undefined) colors.add(m[1].toLowerCase());
		}
		// Plaintext renders a single foreground colour; a working grammar themes
		// distinct scopes (directives, numbers, units) into distinct colours.
		expect(colors.size).toBeGreaterThan(1);
	});
});
