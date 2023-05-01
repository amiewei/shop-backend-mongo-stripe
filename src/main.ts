import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    //enable cors and other global middleware here
    app.enableCors();
    await app.listen(process.env.PORT || 8000);
}
bootstrap();
