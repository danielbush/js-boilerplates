const path = require('path');
const { merge } = require('webpack-merge');
const dev = require('./webpack.dev');

module.exports = merge(dev, {
  entry: {
    boilerplate: [
      path.join(
        __dirname,
        'src/boilerplate/node-babel-patch-react-emotion/index.js',
      ),
    ],
  },
});
