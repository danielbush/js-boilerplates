module.exports = {
  devtool: '#inline-source-map',
  entry: {
    main: [__dirname + '/src/index.js']
  },
  output: {
    path: __dirname + '/build',
    filename: '[name].js'
  }
};
