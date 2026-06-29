import { defineConfig } from "tsdown";

export default defineConfig({
	entry: { mod: "src/index.node.ts" },
	format: "es",
	dts: true,
	clean: true,
	treeshake: true,
	platform: "neutral",
	minify: true,
	exports: true,
	target: "esnext",
	// Inline the grammar JSON so the published module has no external
	// `recipe-tmlanguage` import — a re-exporting CDN (esm.sh) otherwise drops the
	// `with { type: "json" }` attribute and browsers reject the JSON module.
	deps: { alwaysBundle: ["recipe-tmlanguage"] },
});
