const { merge } = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
  },
  plugins: [new CleanWebpackPlugin(), new CompressionPlugin()],
});
