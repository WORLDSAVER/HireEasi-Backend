import {ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import helmet from "helmet";
import * as cookieParser from 'cookie-parser';
const PORT = process.env.PORT || 3000;

async function main() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser())
    app.use(helmet());
    app.enableCors();

    console.log(`Server running on port ${PORT}`);

    await app.listen(PORT);
}

main();
