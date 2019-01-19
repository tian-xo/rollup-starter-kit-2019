import path from 'path'
import copy from 'rollup-plugin-copy-glob'
import babel from 'rollup-plugin-babel'
// import { eslint } from 'rollup-plugin-eslint'
import resolve from 'rollup-plugin-node-resolve'
import commonJS from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import {terser} from 'rollup-plugin-terser'
import postCSS from 'rollup-plugin-postcss'
import serve from 'rollup-plugin-serve'
import hotreload from 'rollup-plugin-livereload'

const SHARED_PLUGINS = [
    postCSS({
        extensions : ['.css', '.styl']
    }),
    resolve({
        jsnext:true,
        main:true,
        browser:true
    }),
    commonJS(),
    // eslint( {
    //     exclude : 'src/style/**'
    // }),
    babel({
        exclude: 'node_modules/**',
        presets : ["@babel/preset-env"],
        targets : "last 2 version, > 1%, maintained node versions, not dead"
    }),
    replace({
        ENV: JSON.stringify( process.env.NODE_ENV || 'development' )
    })
]

export default [{
    input: 'src/main.js',
    output: {
      file: 'dist/bundle2.js',
      format: 'iife'
    },
    plugins : [
        ...SHARED_PLUGINS
    ]
},{
    input: 'src/main.js',
    output: {
      file: 'dist/bundle.js',
      format: 'iife'
    },
    plugins : [
        ...SHARED_PLUGINS,
        copy([
            { files: 'src/*.{html,css}', dest: 'dist' }
        ],  { verbose: true, watch: true }),
        serve({
            contentBase: path.resolve( __dirname + '/dist'),
            port : 8888
        }),
        hotreload('src')
    ]
}]