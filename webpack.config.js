const path = require('path');

module.exports = {
  devtool: '#inline-source-map',
  entry: {
    main: [ path.join(__dirname, 'src/index.js') ]
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    publicPath: '/assets' // webpack-dev-server: <publicPath>/<bundle-name>
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 8000
  }
};
