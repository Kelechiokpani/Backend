import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { Decimal128 } from "mongodb";
export var IUnitType;
(function (IUnitType) {
    IUnitType["day"] = "day";
    IUnitType["week"] = "week";
    IUnitType["month"] = "month";
    IUnitType["year"] = "year";
})(IUnitType || (IUnitType = {}));
const pricingSchema = new Schema({
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
        enum: IUnitType
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
    toObject: { virtuals: true }
});
pricingSchema.plugin(mongoosePaginate);
const Pricing = mongoose.model('Pricing', pricingSchema);
export default Pricing;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJpY2luZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2RlbHMvYWRtaW4vUHJpY2luZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFFBQVEsRUFBRSxFQUFtRCxNQUFNLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDN0YsT0FBTyxnQkFBZ0IsTUFBTSxzQkFBc0IsQ0FBQTtBQUNuRCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBR25DLE1BQU0sQ0FBTixJQUFhLFNBS1o7QUFMRCxXQUFhLFNBQVM7SUFDbEIsd0JBQVUsQ0FBQTtJQUNWLDBCQUFZLENBQUE7SUFDWiw0QkFBYyxDQUFBO0lBQ2QsMEJBQVksQ0FBQTtBQUNoQixDQUFDLEVBTFksU0FBUyxLQUFULFNBQVMsUUFLckI7QUFrQkQsTUFBTSxhQUFhLEdBQUcsSUFBSSxNQUFNLENBQVc7SUFFdkMsTUFBTSxFQUFFO1FBQ0osSUFBSSxFQUFFLFVBQVU7S0FDbkI7SUFDRCxRQUFRLEVBQUU7UUFDTixJQUFJLEVBQUUsTUFBTTtRQUNaLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7S0FDVDtJQUNELFFBQVEsRUFBRTtRQUNOLElBQUksRUFBRSxNQUFNO0tBQ2Y7SUFDRCxJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsTUFBTTtRQUNaLElBQUksRUFBQyxTQUFTO0tBQ2pCO0lBQ0QsT0FBTyxFQUFFO1FBQ0wsSUFBSSxFQUFFLE9BQU87UUFDYixPQUFPLEVBQUUsS0FBSztLQUNqQjtJQUNELFlBQVk7SUFDWixvQkFBb0I7SUFDcEIsZ0RBQWdEO0lBQ2hELDBCQUEwQjtJQUMxQixLQUFLO0NBRVIsRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJO0lBQ1QsVUFBVSxFQUFFLEtBQUs7SUFDbEIsUUFBUSxFQUFFLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBQztDQUNwQyxDQUFDLENBQUM7QUFFSCxhQUFhLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFFdkMsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBVyxTQUFTLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFFbkUsZUFBZSxPQUFPLENBQUMifQ==