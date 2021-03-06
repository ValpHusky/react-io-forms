
import babel from 'rollup-plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import filesize from 'rollup-plugin-filesize';
import autoprefixer from 'autoprefixer';
import localResolve from 'rollup-plugin-local-resolve';

import pkg from './package.json';

const config = {
  
  input: 'src/index.jsx',
  output: [
    {
      exports: 'named',
      file: pkg.browser,
      format: 'umd',
      name: 'IOForm',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'prop-types': 'PropTypes',
        lodash: '_'
      }
    },
    {
      exports: 'named',
      file: pkg.main,
      format: 'cjs',
      name: 'IOForm',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'prop-types': 'PropTypes',
        lodash: '_'
      }
    },
    {
      exports: 'named',
      file: pkg.module,
      format: 'es',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'prop-types': 'PropTypes',
        lodash: '_'
      },
    },
  ],
  plugins: [
    peerDepsExternal({
      includeDependencies: true,
    }),
    postcss({ extract: true, plugins: [autoprefixer] }),
    babel({ exclude: 'node_modules/**', runtimeHelpers: true }),
    localResolve(),
    resolve({
        extensions: [ '.mjs', '.js', '.jsx', '.json' ]
    }),
    commonjs(),
    filesize(),
  ],
};

export default config;
