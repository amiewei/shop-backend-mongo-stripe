import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { LoggerMiddleware } from './app.middleware';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { StripeModule } from './stripe/stripe.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Connection } from 'mongoose';
// import * as vault from 'node-vault';

//defines scope of each module for performance
@Module({
    imports: [
        //for environment variables
        ConfigModule.forRoot(),

        //using vault for secret mgt
        MongooseModule.forRootAsync({
            useFactory: async () => {
                // ------------vault alternative----------------
                // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; //dev only

                // const options = {
                //     apiVersion: 'v1',
                //     endpoint: process.env.VAULT_ENDPOINT,
                //     requestOptions: {
                //         strictSSL: false, //dev only because we are using self signed SSL cert not ca signed
                //     },
                // };

                // // get new instance of the client
                // const vault = require('node-vault')(options);

                // const result = await vault.approleLogin({
                //     role_id: process.env.VAULT_ROLE_ID,
                //     secret_id: process.env.VAULT_SECRET_ID,
                // });

                // // console.log(result);

                // vault.token = result.auth.client_token; // Add token to vault object for subsequent requests.
                // const { data } = await vault.read(process.env.VAULT_SECRET); // Retrieve the secret stored in previous steps.
                // const mongoUser = data.MONGO_USER;
                // const mongoPw = data.MONGO_PW;

                //-------------end vault--------------

                const mongoUser = process.env.MONGO_USER;
                const mongoPw = process.env.MONGO_PW;

                return {
                    uri: `mongodb+srv://${mongoUser}:${mongoPw}@cluster0.ree9mb6.mongodb.net/Products?retryWrites=true&w=majority`,
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                };
            },
        }),
        ProductsModule,
        StripeModule,
    ],
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
// middleware for specific routes defined here
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('products-db');
    }
}
