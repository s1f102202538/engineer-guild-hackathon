import { IncomingMessage, ServerResponse } from 'http';
import { TokenIndexer } from 'morgan';
import morgan from 'morgan';
import logger from '../config/logger';

const format = (tokens: TokenIndexer, req: IncomingMessage, res: ServerResponse) => {
  return {
    timestamp: tokens.date(req, res, 'clf'),
    remote_addr: tokens['remote-addr'](req, res),
    remote_user: tokens['remote-user'](req, res),
    method: tokens.method(req, res),
    url: tokens.url(req, res),
    http_version: tokens['http-version'](req, res),
    status: Number(tokens.status(req, res)),
    content_length: tokens.res(req, res, 'content-length'),
    referrer: tokens.referrer(req, res),
    user_agent: tokens['user-agent'](req, res),
    response_time_ms: Number(tokens['response-time'](req, res)),
  };
};

const morganMiddleware = morgan(
  (tokens, req, res) => {
    const logData = format(tokens, req, res);
    return JSON.stringify(logData);
  },
  {
    stream: {
      write: (message: string) => {
        try {
          const logData = JSON.parse(message);
          logger.info('Access Log:', {
            message: JSON.stringify(logData, null, 2),
          });
        } catch {
          logger.error('Parse Error', { message });
        }
      },
    },
  }
);

export default morganMiddleware;
