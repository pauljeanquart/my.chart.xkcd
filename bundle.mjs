import * as esbuild from 'esbuild'

console.log('esbuild');

await esbuild.build({
  entryPoints: ['index.js'],
  bundle: true,
  outfile: 'out.js',
})