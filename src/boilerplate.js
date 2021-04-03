const config = require('config');

module.exports = () => console.log('hello world', config.get('PORT'));
