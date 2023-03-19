import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { LoggerMiddleware } from './app.middleware';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { StripeModule } from './stripe/stripe.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Connection } from 'mongoose';

//defines scope of each module for performance
@Module({
    imports: [
        //for environment variables
        ConfigModule.forRoot(),
        MongooseModule.forRoot(
            'mongodb+srv://admin:admin@cluster0.ree9mb6.mongodb.net/Products?retryWrites=true&w=majority',
        ),
        ProductsModule,
        StripeModule,
    ], // nestjs feature to link module import, need to import the specific module
    controllers: [AppController],
    providers: [
        AppService,
        LoggerMiddleware,
        {
            provide: Connection,
            useFactory: () => {
                // create a new connection
                return new Connection();
            },
        },
    ],
})
// export class AppModule {}

// middleware for specific routes defined here
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('products-db');
    }
}
