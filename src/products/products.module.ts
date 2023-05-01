import { StripeService } from './../stripe/stripe.service';
import { Module } from '@nestjs/common';
import { ProductsMongoService } from './products.service';
import { ProductsMongoController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductMongo, ProductSchema } from './product.model';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: ProductMongo.name, schema: ProductSchema },
        ]),
    ],
    controllers: [ProductsMongoController],
    providers: [ProductsMongoService, StripeService],
})
export class ProductsModule {}
