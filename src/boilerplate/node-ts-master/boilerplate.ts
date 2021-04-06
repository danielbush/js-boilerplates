import config from 'config';
export default (): void => console.log('hello world', config.get('PORT'));
