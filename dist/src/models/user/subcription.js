import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { Decimal128 } from "mongodb";
import { IUnitType } from "../admin/Pricing.js";
const subSchema = new Schema({
    type: {
        type: String,
        enum: ['premium', 'gold', 'bronze'],
        default: "premium",
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true
    },
    paymentId: {
        type: Schema.Types.ObjectId,
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    amount: {
        type: Decimal128,
        required: true,
        default: 0
    },
    unit: {
        type: String,
        enum: Object.values(IUnitType),
    },
    duration: {
        type: Number
    },
}, {
    versionKey: false,
    timestamps: true,
    toObject: {
        virtuals: true,
    },
    toJSON: { virtuals: true, versionKey: false },
});
subSchema.plugin(mongoosePaginate);
const Subscription = mongoose.model('Subscription', subSchema);
export default Subscription;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ViY3JpcHRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kZWxzL3VzZXIvc3ViY3JpcHRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxRQUFRLEVBQUUsRUFBbUQsTUFBTSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQzdGLE9BQU8sZ0JBQWdCLE1BQU0sc0JBQXNCLENBQUE7QUFDbkQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUNuQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFpQjlDLE1BQU0sU0FBUyxHQUFHLElBQUksTUFBTSxDQUFPO0lBRTNCLElBQUksRUFBQztRQUNELElBQUksRUFBRSxNQUFNO1FBQ1osSUFBSSxFQUFFLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUM7UUFDbkMsT0FBTyxFQUFFLFNBQVM7UUFDbEIsUUFBUSxFQUFFLElBQUk7S0FDakI7SUFDRCxNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1FBQzNCLFFBQVEsRUFBRSxJQUFJO1FBQ2QsS0FBSyxFQUFDLElBQUk7S0FDYjtJQUVELFNBQVMsRUFBQztRQUNOLElBQUksRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7S0FDOUI7SUFFRCxTQUFTLEVBQUM7UUFDTixJQUFJLEVBQUUsSUFBSTtLQUNiO0lBRUQsT0FBTyxFQUFDO1FBQ0osSUFBSSxFQUFDLElBQUk7S0FDWjtJQUNELE1BQU0sRUFBQztRQUNILElBQUksRUFBQyxVQUFVO1FBQ2YsUUFBUSxFQUFDLElBQUk7UUFDYixPQUFPLEVBQUMsQ0FBQztLQUNaO0lBQ0QsSUFBSSxFQUFDO1FBQ0QsSUFBSSxFQUFDLE1BQU07UUFDWCxJQUFJLEVBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7S0FDaEM7SUFDRCxRQUFRLEVBQUM7UUFDTCxJQUFJLEVBQUMsTUFBTTtLQUNkO0NBRUosRUFDRDtJQUNJLFVBQVUsRUFBRSxLQUFLO0lBQ2pCLFVBQVUsRUFBRSxJQUFJO0lBQ2hCLFFBQVEsRUFBRTtRQUNOLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBQ0QsTUFBTSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFO0NBQ2hELENBQUMsQ0FBQztBQUVQLFNBQVMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUNuQyxNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFPLGNBQWMsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUVyRSxlQUFlLFlBQVksQ0FBQyJ9