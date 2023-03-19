import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { ProductMongo, ProductSchema } from './stripe.model';

@Module({
    imports: [
        //creates model and makes it injectable
    ],
    controllers: [StripeController], //dont forget to ALL the controllers and serivces here
    providers: [StripeService],
})
export class StripeModule {}
