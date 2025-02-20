import mongoose, { Document, Model, model, ObjectId, PaginateModel, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'
import {Decimal128} from "mongodb";


export enum  IUnitType {
    day= 'day' ,
    week= 'week',
    month= 'month',
    year= 'year'
}


export interface IPricing extends Document {
    // status: 'pending' | 'completed' | 'failed';
    _id:ObjectId
    type: "premium"
    amount: Decimal128
    discount: number
    disable: boolean
    unit: IUnitType
    duration: number,
    updatedAt?:Date
    createdAt?:Date
}



const pricingSchema = new Schema<IPricing>({

    amount: {
        type: Decimal128,
    },
    discount: {
        type: Number,
        max: 1,
        min: 0,
    },
    duration: {
        type: Number,
    },
    unit: {
        type: String,
        enum:IUnitType
    },
    disable: {
        type: Boolean,
        default: false
    },
    // status: {
    //     type: String,
    //     enum: ['pending', 'completed', 'failed'],
    //     default: 'pending',
    // },

}, { timestamps: true,
            versionKey: false,
           toObject: {virtuals: true}
});

pricingSchema.plugin(mongoosePaginate);

const Pricing = mongoose.model<IPricing>('Pricing', pricingSchema);

export default Pricing;
