import logger from './config/logger';
import config from "./config/config";
import {app} from "./server"
import dotenv from "dotenv";
import { createConnection } from 'typeorm';

dotenv.config({path: '.env'});

logger.info(`Environment: ${process.env.NODE_ENV}`);

let server;

createConnection().then(async _ => {
    logger.info('Database connection established');
    server = app.listen(config.port || process.env.PORT, async () => {
        logger.info(`Listening to port ${config.port || process.env.PORT}`);
    });
}).catch(error => logger.error('Database connection error: ', error))


const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    if (server) {
        server.close();
    }
});
