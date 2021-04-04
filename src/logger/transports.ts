import {
  transports as defaultTransports,
  httpTransports as defaultHttpTransports,
} from './default/transports';

// Configure your transports here:
const transports = defaultTransports;
const httpTransports = defaultHttpTransports;

export { transports, httpTransports };
