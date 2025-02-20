import mongoose, { Document, Model, model, ObjectId, PaginateModel, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'
import {Decimal128} from "mongodb";
import {IUnitType} from "../admin/Pricing.js";



export interface ISub extends Document {
    type: "premium" | "gold" | "bronze"
    userId:ObjectId
    amount:Decimal128,
    paymentId:ObjectId,
    unit:IUnitType
    duration:number;
    startDate: Date;
    endDate: Date;
}



const subSchema = new Schema<ISub>({

        type:{
            type: String,
            enum: ['premium', 'gold', 'bronze'],
            default: "premium",
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            index:true
        },

        paymentId:{
            type: Schema.Types.ObjectId,
        },

        startDate:{
            type: Date
        },

        endDate:{
            type:Date
        },
        amount:{
            type:Decimal128,
            required:true,
            default:0
        },
        unit:{
            type:String,
            enum:Object.values(IUnitType),
        },
        duration:{
            type:Number
        },

    },
    {
        versionKey: false,
        timestamps: true,
        toObject: {
            virtuals: true,
        },
        toJSON: { virtuals: true, versionKey: false },
    });

subSchema.plugin(mongoosePaginate);
const Subscription = mongoose.model<ISub>('Subscription', subSchema);

export default Subscription;

