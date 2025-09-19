import esbuild from "esbuild";
import sveltePlugin from "esbuild-svelte";

const options = {
  entryPoints: ["frontend/src/js/index.js"],
  mainFields: ["svelte", "browser", "module", "main"],
  conditions: ["svelte", "browser"],
  bundle: true,
  outfile: "frontend/public/js/index.js",
  plugins: [sveltePlugin()],
  logLevel: "info",
};

if (process.argv.includes("--watch")) {
  options.banner ={
    js: "new EventSource('http://127.0.0.1:8888/esbuild').addEventListener('change', () => location.reload());"
  };
  const ctx = await esbuild.context(options);
  await ctx.watch();
  await ctx.serve({
    servedir: './',
    port: 8888,
    host: '127.0.0.1',
    cors: {
      origin: 'http://127.0.0.1:8000',
    }
  });
} else {
  await esbuild.build(options);
}
