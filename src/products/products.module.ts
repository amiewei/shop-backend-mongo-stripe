import { StripeService } from './../stripe/stripe.service';
import { Module } from '@nestjs/common';
import { ProductsMongoService } from './products.service';
import { ProductsMongoController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductMongo, ProductSchema } from './product.model';

@Module({
    imports: [
        //creates model and makes it injectable
        MongooseModule.forFeature([
            //name: Product.name is just refering the name "Product" to reference the schema
            { name: ProductMongo.name, schema: ProductSchema },
        ]),
    ],
    controllers: [ProductsMongoController], //dont forget to ALL the controllers and serivces here
    providers: [ProductsMongoService, StripeService],
})
export class ProductsModule {}
