import * as esbuild from 'esbuild'

console.log('esbuild');

await esbuild.build({
  entryPoints: ['app.css'],
  bundle: true,
  minify: true,
  sourcemap: true,
  outfile: 'app.bundle.min.css',
})

await esbuild.build({
  entryPoints: ['app.js'],
  bundle: true,
  minify: true,
  sourcemap: true,
  outfile: 'app.bundle.min.js',
})