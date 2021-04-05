const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const cssLoaders = ({ modules = false }) => [
  { loader: 'style-loader' },
  {
    loader: 'css-loader',
    options: {
      importLoaders: 1,
      modules,
    },
  },
  { loader: 'postcss-loader' },
];

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  entry: {
    dist: [path.join(__dirname, 'src/index.js')],
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    publicPath: '/assets',
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      template: path.resolve(__dirname, './templates/index.html'),
      alwaysWriteToDisk: true, // added by HtmlWebpackHarddiskPlugin
    }),
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  module: {
    // https://webpack.js.org/concepts/loaders/
    // "Loaders are evaluated/executed from right to left (or from bottom to top)."
    rules: [
      {
        test: /\.jsx?$|\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.module\.css$/,
        use: cssLoaders({ modules: true }),
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: cssLoaders({ modules: false }),
      },
    ],
  },
};
