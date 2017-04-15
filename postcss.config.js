// See https://github.com/postcss/postcss-loader .
module.exports = {
  plugins: [
    require('postcss-cssnext'),
    require('postcss-browser-reporter'),
    require('postcss-reporter'),
  ]
};
