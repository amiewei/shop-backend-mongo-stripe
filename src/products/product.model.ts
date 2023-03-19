import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

//based on the mongoose base class, so this interface is mongoose compatible
export interface Product extends mongoose.Document {
    id: string;
    itemName: string;
    itemDescription: string;
    bulgarianName: string;
    imageId: Array<string>;
    price: number;
    stripePriceId: string;
    stripeProductId: string;
}

export interface Price {
    price: number;
    stripePriceId: string;
    stripeProductId: string;
}

// ----- below is product Mongo Schema---
export type ProductDocument = HydratedDocument<ProductMongo>;

@Schema()
export class ProductMongo {
    @Prop({ required: true })
    itemName: string;

    @Prop({ required: true })
    itemDescription: string;

    @Prop({ required: true })
    bulgarianName: string;

    @Prop()
    imageId: Array<string>;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    stripePriceId: string;

    @Prop({ required: true })
    stripeProductId: string;

    //qty should be part of inventory table?
}

export const ProductSchema = SchemaFactory.createForClass(ProductMongo);
