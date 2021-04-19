import typescript from '@rollup/plugin-typescript'
import html from '@rollup/plugin-html'
import resolve from '@rollup/plugin-node-resolve'
import vue from 'rollup-plugin-vue'
import commonjs from '@rollup/plugin-commonjs';

const Main = {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'cjs'
  },
  plugins: [typescript(), resolve(), commonjs()]
}
const Renderer = {
  input: 'src/era.ts',
  output: {
    file: 'dist/era.js',
    format: 'esm'
  },
  plugins: [
    typescript({
      tsconfig: false,
      experimentalDecorators: true,
      module: 'ES6'
    }),
    vue(),
    resolve(),
    commonjs(),
    html()]
}
const NetWorker = {
  input: 'src/workers/net.ts',
  output: {
    file: 'dist/net.worker.js',
    format: 'esm'
  },
  plugins: [typescript()]
}
const MapWorker = {
  input: 'src/workers/map.ts',
  output: {
    file: 'dist/map.worker.js',
    format: 'esm'
  },
  plugins: [typescript()]
}
export default [Main, Renderer, NetWorker, MapWorker]
