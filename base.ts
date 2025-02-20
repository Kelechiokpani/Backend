import bcrypt from 'bcrypt';
import {Document} from "mongoose";
import MongooseErrorUtils from "./src/helpers/mongoErrorHandler.js";




class Base {

    static async generateOTP(): Promise<string> {
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        return otp;
    }
    

    static async generateMembershipId(): Promise<string> {
        const prefix = 'DTW';
        const randomId = Math.random().toString(36).substring(2, 8).toUpperCase();
        return `${prefix}${randomId}`;
    }


    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }


    async handleMongoError(mongo: Promise<Document>): Promise<Document> {
        return new Promise((resolve, reject) => {
            mongo.then((data) => resolve(data))
                .catch((reason) => {
                    reject(MongooseErrorUtils.handleMongooseError(reason));
                });
        });
    }



}


export default Base;
