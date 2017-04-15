// See https://github.com/postcss/postcss-loader .
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-nested')
  ]
};
