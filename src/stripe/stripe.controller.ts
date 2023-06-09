import { Controller, Post, Body, Get, HttpCode } from '@nestjs/common';
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
        return await this.stripeService.getAllProductsFromStripe();
    }

    @Get('get-all-prices-stripe')
    async getAllPrices() {
        return await this.stripeService.getAllPricesFromStripe();
    }

    @Get('get-all-prices-and-products-stripe')
    async getAllStripe() {
        return await this.stripeService.getAllStripe();
    }
}
