import __User, {accountType, IUser} from '../../models/user/User.js';
import {
    AccountValidation,
    IAccountLogout,
} from "../../validation/index.js";
import Base from "../../../base.js";
import {ADMIN_EMAIL, isDev} from "../../helpers/config.js";


const ErrorMessage = "User ID is required to Continue";
const InvalidCredential = "Invalid user credential email is not registered";
const InvalidLogin = "Invalid login credentials";


class UserDatasource extends Base {

    public userLogout = async (data:IAccountLogout, res: any): Promise<{ success: boolean; message: string }> => {
        try {
            await new AccountValidation().userLogout(data);
            const {userId} = data
            if (!userId) {
                return { success: false, message: ErrorMessage };
            }
            // Find the user by their _id safely
            const user: any = await __User.findById(userId);
            if (!user) {
                return { success: false, message: "User not found" };
            }
            user.currentToken = null;
            await user.save();
            res.cookie("token", "",
                { httpOnly: true,
                    secure: !isDev,
                    sameSite: "strict",
                    expires: new Date(0) });
            return ({ success: true, message: "Logout successful" });
        } catch (error: any) {
            const errorMessage = error.message.includes("Cast to ObjectId failed for value")
                ? "Invalid User ID provided."
                : error.message || "Unable to complete logout process";
            return ({ success: false, message: errorMessage});
        }
    };



}

export default UserDatasource;
