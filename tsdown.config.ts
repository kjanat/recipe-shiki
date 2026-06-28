import { defineConfig } from "tsdown";

export default defineConfig({
	entry: { index: "src/index.node.ts" },
	format: "es",
	dts: true,
	clean: true,
	treeshake: true,
	platform: "neutral",
	minify: true,
	exports: true,
	target: "esnext",
});
