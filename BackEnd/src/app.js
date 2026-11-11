import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { env, isDevelopment, isProduction } from './config/index.js';
import apiV1Routes from './routes/index.js';
import { notFoundHandler, errorHandler } from './middlewares/error.middleware.js';

const app = express();

// Behind nginx/cPanel/Render the real client IP arrives in X-Forwarded-For.
// Without this, rate limiting would treat every request as the same client.
if (isProduction) app.set('trust proxy', 1);

// --- Security & parsing ---------------------------------------------------
app.use(helmet());
app.use(
  cors({
    origin: env.clientUrl.split(',').map((url) => url.trim()),
    credentials: true,
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// --- Logging --------------------------------------------------------------
if (isDevelopment) app.use(morgan('dev'));

// --- Rate limiting --------------------------------------------------------
app.use(
  '/api',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { success: false, message: 'Too many requests, please try again later.' },
  })
);

// --- Routes ---------------------------------------------------------------
app.get('/', (_req, res) => res.json({ success: true, message: 'Nyulo Interior API — see /api/v1/health' }));

// Passenger (cPanel "Setup Node.js App") mounts the app under a base URI such
// as /api, and depending on the host it either strips that prefix before
// Express sees the path or passes it through. Mounting the same router at both
// paths makes the API reachable either way.
app.use('/api/v1', apiV1Routes);
app.use('/v1', apiV1Routes);

// --- Errors ---------------------------------------------------------------
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
