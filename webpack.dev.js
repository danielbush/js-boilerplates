const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  plugins: [new HtmlWebpackHarddiskPlugin()],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    inline: true,
    hot: true,
    historyApiFallback: true,
  },
});
