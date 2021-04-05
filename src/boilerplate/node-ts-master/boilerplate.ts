import config from 'config';
export default () => console.log('hello world', config.get('PORT'));
