'use strict';

var path = require('path');

module.exports = {
  alias: {
    'three-examples': path.join(__dirname, './node_modules/three/examples/js')
  },
  modules: [
    'node_modules',
    path.resolve(process.cwd(), 'src')
  ],
  extensions: ['.ts', '.js', 'scss']
};
