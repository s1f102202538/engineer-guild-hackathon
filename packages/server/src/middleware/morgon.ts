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

const stream = {
  write: (message: string) => {
    try {
      const logData = JSON.parse(message.trim());
      logger.info(logData);
    } catch {
      logger.info(message.trim());
    }
  },
};

const morganMiddleware = morgan(JSON.stringify(format), { stream });

export default morganMiddleware;
