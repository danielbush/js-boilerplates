// See https://github.com/postcss/postcss-loader .
module.exports = {
  parser: 'postcss-scss', // gives us inline css comments, remove to use postcss css parser instead
  plugins: [
    require('postcss-import'),
    require('postcss-url'),
    require('postcss-preset-env'),
    require('postcss-reporter'),
  ],
};
