import { StripeService } from './../stripe/stripe.service';
import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
} from '@nestjs/common';
import { ProductsMongoService } from './products.service';

@Controller('api/products')
export class ProductsMongoController {
    constructor(
        private readonly productsMongoService: ProductsMongoService,
        private readonly stripeService: StripeService,
    ) {}

    @Post('add')
    async addProductToDB(
        @Body('name') itemName: string,
        @Body('description') itemDescription: string,
        @Body('bulgarianName') bulgarianName: string,
        @Body('imageid') imageId: string,
        @Body('price') price: number,
        @Body('stripePriceId') stripePriceId: string,
        @Body('stripeProductId') stripeProductId: string,
    ) {
        const createdProduct = await this.productsMongoService.addProduct(
            itemName,
            itemDescription,
            bulgarianName,
            imageId,
            price,
            stripePriceId,
            stripeProductId,
        );
        return createdProduct;
    }

    @Get()
    async getAllProductsFromDB() {
        //returns the list of products from the injectable method from the class
        return await this.productsMongoService.getAllProducts();
    }

    @Get(':id')
    async getProduct(@Param('id') id: string) {
        return await this.productsMongoService.getSingleProduct(id);
    }
    // //update/merge changes with existing product
    @Patch(':id')
    async updateProduct(
        @Param('id') id: string,
        @Body('name') itemName: string,
        @Body('description') itemDescription: string,
        @Body('bulgarianName') bulgarianName: string,
        @Body('imageid') imageId: string,
        @Body('price') price: number,
        @Body('stripePriceId') stripePriceId: string,
        @Body('stripeProductId') stripeProductId: string,
    ) {
        const updatedProduct =
            await this.productsMongoService.updateSingleProduct(
                id,
                itemName,
                itemDescription,
                bulgarianName,
                imageId,
                price,
                stripePriceId,
                stripeProductId,
            );
        return updatedProduct;
    }

    @Delete(':id')
    async removeProduct(@Param('id') id: string) {
        await this.productsMongoService.deleteSingleProduct(id);
        return null;
    }

    //handle from stripe controller - update mongodb with price and product data from stripe
    @Post('process-stripe-data')
    async updateStripeData() {
        // get updated product and prices from stripe
        const updatedStripeProducts = await this.stripeService.getAllStripe();

        console.log(updatedStripeProducts);
        //process stripe data
        await this.productsMongoService.updateProductPricesInMongo(
            updatedStripeProducts,
        );

        return null;
    }
}
