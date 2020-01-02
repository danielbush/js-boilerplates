const config = require('config');
console.log('hello world', config.get('PORT'));
module.exports = () => console.log('hello world');
