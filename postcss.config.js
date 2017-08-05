// See https://github.com/postcss/postcss-loader .
// and http://cssnext.io/postcss/
module.exports = {
  parser: 'postcss-scss', // gives us inline css comments, remove to use postcss css parser instead
  plugins: [
    require('postcss-import'),
    require('postcss-url'),
    require('postcss-cssnext'),
    require('postcss-browser-reporter'),
    require('postcss-reporter'),
  ]
};
