import { defineConfig } from "tsdown";

export default defineConfig({
	format: "es",
	dts: true,
	clean: true,
	treeshake: true,
	platform: "neutral",
	minify: true,
	exports: true,
	target: "esnext",
});
