// See https://github.com/postcss/postcss-loader .
// and http://cssnext.io/postcss/
module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-url'),
    require('postcss-cssnext'),
    require('postcss-browser-reporter'),
    require('postcss-reporter'),
  ]
};
