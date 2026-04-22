import type { LanguageRegistration } from "@shikijs/types";
import grammar from "recipe-tmlanguage" with { type: "json" };

const recipe = [
	{
		...grammar,
		name: "recipe",
		scopeName: "source.recipe",
		displayName: "Recipe",
		aliases: ["rx", "rcp"],
	},
] satisfies LanguageRegistration[];

export default recipe;
