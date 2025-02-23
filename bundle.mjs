import * as esbuild from 'esbuild'

console.log('esbuild');

await esbuild.build({
  entryPoints: ['app.js'],
  bundle: true,
  minify: true,
  sourcemap: true,
  outfile: 'out.js',
})