import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
    Res,
    HttpCode,
} from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('api')
export class StripeController {
    ProductsMongoController: any;
    constructor(private readonly stripeService: StripeService) {}

    @Post('create-checkout-session')
    @HttpCode(200)
    async createCheckoutSession(@Body('cart') line_items: object) {
        console.log('stripe controller - create checkout session');

        const sessionUrl = await this.stripeService.createCheckoutSession(
            line_items,
        );

        console.log('session url: ' + sessionUrl);
        return sessionUrl;
    }

    @Get('get-all-products-stripe')
    async getAllProducts() {
        console.log('get all products');
        return await this.stripeService.getAllProductsFromStripe();
    }

    @Get('get-all-prices-stripe')
    async getAllPrices() {
        console.log('get all prices');
        return await this.stripeService.getAllPricesFromStripe();
    }

    @Get('get-all-prices-and-products-stripe')
    async getAllStripe() {
        return await this.stripeService.getAllStripe();
    }

    @Get()
    async getAllProductsFromDB() {
        console.log('get all products from db');
        // //returns the list of products from the injectable method from the class
        // return await this.productsMongoService.getAllProducts();
    }
}
