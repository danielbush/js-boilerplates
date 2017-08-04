require('dotenv').config();
const path = require('path');

module.exports = {
  devtool: '#inline-source-map',
  entry: {
    boilerplate: [ path.join(__dirname, 'src/boilerplate.js') ],
    main: [ path.join(__dirname, 'src/index.js') ]
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    publicPath: '/assets' // webpack-dev-server: <publicPath>/<bundle-name>
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: process.env.PORT
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true
            }
          },
          { loader: 'postcss-loader' }
        ]
      }
    ]
  }
};
