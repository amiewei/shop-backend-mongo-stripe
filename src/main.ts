import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerMiddlewareFunc } from './app.middleware';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    //enable cors and other global middleware here
    // app.use(loggerMiddlewareFunc);
    app.enableCors();
    await app.listen(8080);
}
bootstrap();
