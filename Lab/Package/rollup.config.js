import typescript from '@rollup/plugin-typescript'
import html from '@rollup/plugin-html'
import resolve from '@rollup/plugin-node-resolve'
import vue from 'rollup-plugin-vue'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import OMT from '@surma/rollup-plugin-off-main-thread'
import clear from 'rollup-plugin-clear'
import replace from '@rollup/plugin-replace'
import styles from 'rollup-plugin-styles'
import nodePolyfills from 'rollup-plugin-node-polyfills'

const Renderer = {
  input: 'src/era.ts',
  output: {
    file: 'dist/era.js',
    format: 'esm'
  },
  plugins: [
    clear({
      targets: ['dist'],
      watch: true // default: false
    }),
    typescript({
      tsconfig: false,
      experimentalDecorators: true,
      module: 'esnext'
    }),
    nodePolyfills(),
    resolve({ preferBuiltins: false }),
    commonjs(),
    vue({ preprocessStyles: true }),
    styles(),
    OMT(),
    // terser(),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    html({
      title: 'Era.js Game Engine'
    })
  ]
}
export default Renderer
