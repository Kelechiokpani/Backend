import mongoose, { Document, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'



export enum accountType {
    admin = "admin",
    user = "user",
}

export interface IUser extends Document {
    _id:string;
    fullName: string;
    phoneNumber: string;
    email: string;
    password: string;

    role: "user" | 'admin';
    image: string
    membershipId: string;
    accountType: accountType;
    otp: string | undefined

    otpCreationTime: Date | ''
    otpRetryTime: Date | ''

    currentToken?: string;
    updatedAt: Date
    createdAt: Date

    isVerified: boolean;
    verificationToken?: string;
}


const userSchema = new Schema<IUser>({
  
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
            toObject: {virtuals: true}
});


userSchema.plugin(mongoosePaginate);

userSchema.index({email: 1, username: 1}, {unique: true})

const User = mongoose.model<IUser>('User', userSchema);

export default User;
