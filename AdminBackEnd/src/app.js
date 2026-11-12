import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { env, isDevelopment, isProduction } from './config/index.js';
import routes from './routes/index.js';
import { notFoundHandler, errorHandler } from './middlewares/error.middleware.js';

const app = express();

// Behind LiteSpeed/Passenger the client IP and protocol arrive in X-Forwarded-*.
if (isProduction) app.set('trust proxy', 1);

app.use(helmet());
app.use(cors({ origin: env.clientUrl.split(',').map((url) => url.trim()) }));
app.use(express.json({ limit: '1mb' }));

if (isDevelopment) app.use(morgan('dev'));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 1000,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { success: false, message: 'Too many requests, please try again later.' },
  })
);

// Passenger mounts the app under /admin-api and may or may not strip that
// prefix before Express sees the path, so the router answers on both.
app.use('/admin-api/v1', routes);
app.use('/v1', routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
