import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
export var accountType;
(function (accountType) {
    accountType["admin"] = "admin";
    accountType["user"] = "user";
})(accountType || (accountType = {}));
const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        index: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['user', 'admin', 'housemate', 'staff'],
        default: 'user'
    },
    membershipId: {
        type: String,
        unique: true, // Ensure membership IDs are unique
    },
    accountType: {
        type: String,
        enum: accountType,
        default: accountType.user,
        required: true,
    },
    image: {
        type: String,
        default: null,
    },
    otp: {
        type: String,
    },
    otpCreationTime: {
        type: Date,
    },
    otpRetryTime: {
        type: Date
    },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    currentToken: { type: String, default: null },
}, {
    timestamps: true,
    versionKey: false,
    toObject: { virtuals: true }
});
userSchema.plugin(mongoosePaginate);
userSchema.index({ email: 1, username: 1 }, { unique: true });
const User = mongoose.model('User', userSchema);
export default User;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2RlbHMvdXNlci9Vc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxFQUFFLEVBQVksTUFBTSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3RELE9BQU8sZ0JBQWdCLE1BQU0sc0JBQXNCLENBQUE7QUFJbkQsTUFBTSxDQUFOLElBQVksV0FHWDtBQUhELFdBQVksV0FBVztJQUNuQiw4QkFBZSxDQUFBO0lBQ2YsNEJBQWEsQ0FBQTtBQUNqQixDQUFDLEVBSFcsV0FBVyxLQUFYLFdBQVcsUUFHdEI7QUEyQkQsTUFBTSxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQVE7SUFFakMsUUFBUSxFQUFFO1FBQ04sSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsSUFBSTtRQUNkLElBQUksRUFBRSxJQUFJO1FBQ1YsU0FBUyxFQUFFLElBQUk7S0FDbEI7SUFFRCxLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO1FBQ2QsTUFBTSxFQUFFLElBQUk7UUFDWixJQUFJLEVBQUUsSUFBSTtRQUNWLFNBQVMsRUFBRSxJQUFJO1FBQ2YsS0FBSyxFQUFFLElBQUk7S0FDZDtJQUVELFdBQVcsRUFBRTtRQUNULElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7UUFDZCxNQUFNLEVBQUUsSUFBSTtRQUNaLEtBQUssRUFBRSxJQUFJO0tBQ2Q7SUFFRCxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7SUFHMUMsSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLE1BQU07UUFDWixJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxPQUFPLENBQUM7UUFDN0MsT0FBTyxFQUFFLE1BQU07S0FDbEI7SUFFRCxZQUFZLEVBQUU7UUFDVixJQUFJLEVBQUUsTUFBTTtRQUNaLE1BQU0sRUFBRSxJQUFJLEVBQUUsbUNBQW1DO0tBQ3BEO0lBRUQsV0FBVyxFQUFFO1FBQ1QsSUFBSSxFQUFFLE1BQU07UUFDWixJQUFJLEVBQUUsV0FBVztRQUNqQixPQUFPLEVBQUUsV0FBVyxDQUFDLElBQUk7UUFDekIsUUFBUSxFQUFFLElBQUk7S0FDakI7SUFFRCxLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU8sRUFBRSxJQUFJO0tBQ2hCO0lBRUQsR0FBRyxFQUFFO1FBQ0QsSUFBSSxFQUFFLE1BQU07S0FDZjtJQUVELGVBQWUsRUFBRTtRQUNiLElBQUksRUFBRSxJQUFJO0tBQ2I7SUFFRCxZQUFZLEVBQUU7UUFDVixJQUFJLEVBQUUsSUFBSTtLQUNiO0lBRUQsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFO0lBQzdDLGlCQUFpQixFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRTtJQUVuQyxZQUFZLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7Q0FHaEQsRUFBRTtJQUNTLFVBQVUsRUFBRSxJQUFJO0lBQ2hCLFVBQVUsRUFBRSxLQUFLO0lBQ2pCLFFBQVEsRUFBRSxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUM7Q0FDckMsQ0FBQyxDQUFDO0FBR0gsVUFBVSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBRXBDLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUMsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFBO0FBRXpELE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQVEsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBRXZELGVBQWUsSUFBSSxDQUFDIn0=