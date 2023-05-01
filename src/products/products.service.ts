import { Injectable, NotFoundException } from '@nestjs/common';
import { Product, ProductMongo, ProductDocument } from './product.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Error } from 'mongoose';

@Injectable()
export class ProductsMongoService {
    constructor(
        @InjectModel(ProductMongo.name)
        private readonly productModel: Model<ProductDocument>,
    ) {}

    async addProduct(
        itemName: string,
        itemDescription: string,
        bulgarianName: string,
        imageId: string,
        price: number,
        stripePriceId: string,
        stripeProductId: string,
    ) {
        console.log('products service - add product');

        const createdProduct = new this.productModel({
            itemName,
            itemDescription,
            bulgarianName,
            imageId,
            price,
            stripePriceId,
            stripeProductId,
        });
        try {
            const result = await createdProduct.save();
            console.log('saved to mongo');
            return result.id as string;
        } catch (error) {
            if (error instanceof Error.ValidationError) {
                const validationError = new Error(
                    'Validation error: ' + error.message,
                );
                validationError.name = 'ValidationError';
                // return validationError;
            } else {
                console.log('error');
                throw error;
            }
        }
    }

    //get all products but not include to display to frontend if theres no price listed
    async getAllProducts() {
        const products = await this.productModel.find().exec();
        const updatedProducts = products
            .filter((prod) => prod.price !== undefined)
            .map((prod) => ({
                id: prod.id,
                itemName: prod.itemName,
                itemDescription: prod.itemDescription,
                //divide by 100 to display in dollars
                price: prod.price / 100,
                bulgarianName: prod.bulgarianName,
                imageId: prod.imageId,
                stripePriceId: prod.stripePriceId,
                stripeProductId: prod.stripeProductId,
            }));

        return updatedProducts;
    }

    async getSingleProduct(id: string) {
        const product = await this.findProduct(id);

        return {
            id: product.id,
            itemName: product.itemName,
            itemDescription: product.itemDescription,
            price: product.price,
            bulgarianName: product.bulgarianName,
            imageId: product.imageId,
            stripePriceId: product.stripePriceId,
            stripeProductId: product.stripeProductId,
        } as Product;
    }

    async updateSingleProduct(
        id: string,
        itemName: string,
        itemDescription: string,
        bulgarianName: string,
        imageId: string,
        price: number,
        stripePriceId: string,
        stripeProductId: string,
    ) {
        //reusing the getSingleProduct mthod above
        const updatedProduct = await this.findProduct(id);

        if (itemName) {
            updatedProduct.itemName = itemName;
        }
        if (itemDescription) {
            updatedProduct.itemDescription = itemDescription;
        }
        if (price) {
            updatedProduct.price = price;
        }
        if (bulgarianName) {
            updatedProduct.bulgarianName = bulgarianName;
        }
        if (stripePriceId) {
            updatedProduct.stripePriceId = stripePriceId;
        }
        if (stripeProductId) {
            updatedProduct.stripeProductId = stripeProductId;
        }
        if (imageId) {
            updatedProduct.imageId = [imageId];
        }

        //update existing product
        updatedProduct.save();
        return updatedProduct as Product;
    }

    //find by productId and update fields
    async updateProductPricesInMongo(stripeProductsToUpdate) {
        for (const product of stripeProductsToUpdate) {
            try {
                const filter = { stripeProductId: product.productId };
                console.log('updating: ' + product.stripeProductId);
                const update = {
                    itemName: product.itemName,
                    itemDescription: product.itemDescription,
                    price: product.price,
                    bulgarianName: product.bulgarianName,
                    imageId: product.imageId,
                    stripePriceId: product.priceId,
                    stripeProductId: product.productId,
                };
                const options = { new: true, upsert: true };
                const updatedProduct = await this.productModel
                    .findOneAndUpdate(filter, update, options)
                    .exec();
            } catch (error) {
                console.log(error + product.itemName);
                continue;
            }
        }
    }

    async deleteSingleProduct(id: string) {
        console.log('to delete single product');
        const result = await this.productModel.deleteOne({ _id: id }).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException('Could Not Find Product');
        } else {
            console.log('delete single product');
        }

        console.log(result);
    }

    //private method --- utility method
    private async findProduct(id: string) {
        let product;
        try {
            product = await this.productModel.findById(id).exec();
            console.log(product);
        } catch (error) {
            //catch mongo error - if error in mongo
            throw new NotFoundException('Could Not Find Product');
        }

        return product as Product;
    }
}
