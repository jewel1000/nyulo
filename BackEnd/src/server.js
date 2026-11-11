import app from './app.js';
import { env } from './config/index.js';
import { connectDatabase } from './config/db.js';
import logger from './utils/logger.js';

const start = async () => {
  await connectDatabase();

  const server = app.listen(env.port, () => {
    logger.info(`Nyulo Interior API listening on http://localhost:${env.port} (${env.nodeEnv})`);
  });

  const shutdown = (signal) => {
    logger.info(`${signal} received — shutting down gracefully...`);
    server.close(() => process.exit(0));
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
};

start();
