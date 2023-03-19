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
import { Product, Price } from './product.model';
import { ProductsMongoService } from './products.service';

@Controller('api/products')
export class ProductsMongoController {
    // productService: any;
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
        console.log('add product to db');

        //from the injectable from ./products.service.ts inside the ProductsService class
        //need to await response from mongodb here as well as in the service
        const createdProduct = await this.productsMongoService.addProduct(
            itemName,
            itemDescription,
            bulgarianName,
            imageId,
            price,
            stripePriceId,
            stripeProductId,
        );
        console.log(createdProduct);
        return createdProduct;
        //in postman make sure to choose POST method, body: raw, JSON!
    }

    @Get()
    async getAllProductsFromDB() {
        console.log('get all products from db');
        //returns the list of products from the injectable method from the class
        return await this.productsMongoService.getAllProducts();
    }

    @Get(':id')
    async getProduct(@Param('id') id: string) {
        console.log('getProduct: id:');
        console.log(await this.productsMongoService.getSingleProduct(id));
        return await this.productsMongoService.getSingleProduct(id);
    }
    // //update/merge changes with existing product
    @Patch(':id')
    async updateProduct(
        //@Body('xyz') is the header field shown in the body
        @Param('id') id: string,
        @Body('name') itemName: string,
        @Body('description') itemDescription: string,
        @Body('bulgarianName') bulgarianName: string,
        @Body('imageid') imageId: string,
        @Body('price') price: number,
        @Body('stripePriceId') stripePriceId: string,
        @Body('stripeProductId') stripeProductId: string,
    ) {
        console.log('update product');
        //while id in url, update data will be in body. Not all bodies are required
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
        console.log('id');
        await this.productsMongoService.deleteSingleProduct(id);
        return null;
    }

    //handle from stripe controller - update mongodb with price and product data from stripe
    @Post('process-stripe-data')
    async updateStripeData() {
        // get updated product and prices from stripe
        const updatedStripeProducts = await this.stripeService.getAllStripe();

        console.log('process-stripe-data');
        console.log(updatedStripeProducts);
        //process stripe data
        await this.productsMongoService.updateProductPricesInMongo(
            updatedStripeProducts,
        );

        return null;
    }
}
