import { Injectable } from '@nestjs/common';

@Injectable()
export class StripeService {
    constructor() {}

    async createCheckoutSession(line_items: object) {
        console.log('create Stripe checkout session');
        const stripe = require('stripe')(process.env.STRIPE_API_KEY);
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${process.env.YOUR_DOMAIN}/checkout/success`,
            cancel_url: `${process.env.YOUR_DOMAIN}/checkout/cancel`,
            automatic_tax: {
                enabled: true,
            },
        });

        return session.url;
    }

    async getAllProductsFromStripe() {
        const stripe = require('stripe')(process.env.STRIPE_API_KEY);
        const products = await stripe.products.list({ active: true });

        console.log(products);
        const updatedProducts = products.data.map((item) => ({
            productId: item.id,
            priceId: item.default_price,
            name: item.name,
            description: item.description,
            bulgarianName: item.metadata.bulgarianName,
            //A list of up to 8 URLs of images for this product, meant to be displayable to the customer.
            images: item.images,
        }));

        //----- sample object returned----
        // {
        // "productId": "prod_MiXsF9weVsXbGj",
        // "priceId": "price_1Lz6mHBf7GkYy1aKo6V5FxeC",
        // "name": "Lukanka",
        // "description": "Bulgarian salami cured with spices",
        // "bulgarianName": "луканка",
        // "images": []
        // }

        return updatedProducts;
    }

    async getAllPricesFromStripe() {
        const stripe = require('stripe')(process.env.STRIPE_API_KEY);
        console.log('strip api key');
        console.log(process.env.STRIPE_API_KEY);
        const prices = await stripe.prices.list({ active: true });
        console.log(prices);

        const updatedPrices = prices.data.map((item) => ({
            priceId: item.id,
            productId: item.product,
            price: item.unit_amount,
        }));

        // ----sample object returned----
        // {
        //     "priceId": "price_1LzUFABf7GkYy1aKGYif3IV7",
        //     "productId": "prod_Miw7i3HsG9ZUCg",
        //     "price": 1500
        // },

        return updatedPrices;
    }

    async getAllStripe() {
        const [products, prices] = await Promise.all([
            this.getAllProductsFromStripe(),
            this.getAllPricesFromStripe(),
        ]);

        const mergedProductsWithPrices = products.map((product) => {
            const matchingPrice = prices.find(
                (price) =>
                    price.productId === product.productId &&
                    price.priceId === product.priceId,
            );

            if (matchingPrice) {
                return { ...product, ...matchingPrice };
            }

            return product;
        });

        const updatedStripeProducts = mergedProductsWithPrices.map(
            (product) => ({
                itemName: product.name,
                itemDescription: product.description,
                productId: product.productId,
                priceId: product.priceId,
                //if the following fields are missing data, then don't include these fields
                ...(product.images.length > 0 && { imageId: product.images }),
                ...(product.bulgarianName && {
                    bulgarianName: product.bulgarianName,
                }),
                price: product.price,
            }),
        );

        return updatedStripeProducts;
    }
}
