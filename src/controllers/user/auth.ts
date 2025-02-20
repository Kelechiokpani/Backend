import __User, {accountType, IUser} from '../../models/user/User.js';
import __Subscription  from '../../models/user/subcription.js';
import jwt from 'jsonwebtoken';
import {
    AccountValidation,
    IAccountForgotPassword,
    IAccountLogin,
    IAccountLogout, IAccountResetPassword,
    IUserCreationValidation, IUserVerificationValidation
} from "../../validation/index.js";
import Base from "../../../base.js";
import {ADMIN_EMAIL, isDev} from "../../helpers/config.js";
import EmailHandlers from "../../helpers/EmailHandlers.js";
import bcrypt from "bcrypt";


const ErrorMessage = "User with this email or phone number already exists";
const InvalidCredential = "Invalid user credential email is not registered";
const InvalidLogin = "Invalid login credentials";
const InvalidOTP = "Invalid OTP  Or OTP has expired, please request a new one.";


class AuthDatasource extends Base {

    public registerUser = async (data: IUserCreationValidation) => {
        try {
            await new AccountValidation().createUser(data);
            const {fullName, email, phoneNumber, password} = data
            const user = await __User.findOne({email});
            if (user) throw new Error(ErrorMessage);
            const membershipId = await Base.generateMembershipId();
            const hashPassword: string = await this.hashPassword(password);
            const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET as string, { expiresIn: "1d" });

            const userData = {
                fullName,
                email,
                phoneNumber,
                password: hashPassword,
                membershipId,
                retries: 1,
                isVerified: false,
                verificationToken,
                accountType: ADMIN_EMAIL === email || email === "devkelly539@gmail.com" ? accountType.admin : accountType.user,
            };

            const createdUser:any = await this.handleMongoError(__User.create(userData));

            await this.handleMongoError(__Subscription.create({userId: createdUser._id, amount: 0}))
            const sendEmailService = await new EmailHandlers({userId:createdUser._id}).InitEmailService();
            await sendEmailService.welcomeEmail()
            // await createdUser.save();

            return {
                 message: "User registered successfully. Click 'Verify Email' to receive a verification link.",
                 success: true,
                 email:createdUser.email,
                 userId: createdUser._id};
        } catch (error: any) {
            return ({success: false, message: error.message || "unable to complete registration process "});
        }
    };

    public sendVerification = async (data: IUserVerificationValidation) => {
        try {
            await new AccountValidation().verifyUser(data);
            const { email} = data
            // const user = await __User.findOne({ email });
            const User = await __User.findOne({ email });

            if (!User) throw new Error(InvalidCredential);
            if (User.isVerified) throw new Error("User is already verified");

            // Generate a new token (optional, in case the old one expired)
            const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET as string, { expiresIn: "1d" });

            // Update user with the new token
            User.verificationToken = verificationToken;
            await User.save();

            // const verificationLink = `https://nuxalle.vercel.app/verify-email?token=${verificationToken}`;
            const verificationLink = `http://localhost:3000/verify-email?token=${verificationToken}`;
            const sendEmailService = await new EmailHandlers({userId:User._id}).InitEmailService();
            await sendEmailService.verification(verificationLink)

            return { success: true, message: "Verification email sent. Please check your inbox." };
        } catch (error: any) {
            return { success: false, message: error.message || "Unable to send verification email" };
        }
    };

    public verifyEmail = async (token: string) => {
        try {
            const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
            const User = await __User.findOne({ email: decoded.email });

            if (!User) throw new Error(InvalidCredential);
            if (User.isVerified) throw new Error("Email already verified");

            // Mark user as verified
            User.isVerified = true;
            User.verificationToken = undefined; // Clear the token after verification
            await User.save();

            return { success: true, message: "Email verified successfully. You can now log in." };
        } catch (error: any) {
            return { success: false, message: error.message || "Invalid or expired verification link." };
        }
    };






    public userLogin = async (data: IAccountLogin, res: any)=> {
        try {
            await new AccountValidation().userLogin(data);
            const { email, password} = data
            const User = await __User.findOne({ email });
            if (!User) throw new Error(InvalidCredential);
            const isMatch: boolean = await this.comparePasswords(password, User.password as string);
            if (!isMatch) throw new Error(InvalidLogin);
            const token = jwt.sign({ id: User._id, role: User.role }, process.env.JWT_SECRET || "CLIENT_SECRET_KEY", { expiresIn: '1h' });

            // Set the JWT in a cookie
            User.currentToken = token;
            await User.save();
            // secure: process.env.NODE_ENV === "production",
            res.cookie("token", token, {
                httpOnly: true,      // Prevent JavaScript access to the cookie
                secure: !isDev,      // Set secure flag only in production
                sameSite: "strict",  // Protects against CSRF
                // secure:false,
                // sameSite: "lax",
                maxAge: 60 * 60 * 1000  // 1 hour expiration
            });
            return {
                success: true,
                message: 'Login successful',
                userId: User._id,
                email: User.email,
                token,
            };
        } catch (error:any) {
            return ({success: false, message: error.message || "unable to complete login process "});
        }
    }

    public forgotUserPassword = async(data: IAccountForgotPassword)=> {
        await new AccountValidation().userForgotPassword(data);
        const {email} = data
        const userData = await __User.findOne({email});
        if (!userData) throw new Error(InvalidCredential);

        const otp = await Base.generateOTP();
        const otpRetryTime = new Date()
        const otpCreationTime = new Date()

        if(userData){
            const sendEmailService = await new EmailHandlers({userId:userData._id}).InitEmailService();
            sendEmailService.forgotPasswordEmail(otp);
            userData.otp = otp
            userData.otpRetryTime = otpRetryTime
            userData.otpCreationTime = otpCreationTime
            await userData.save()
        }

        return {message: "Otp successfully sent to your email",   email: userData.email, success: true,}

    }

    public resetPassword = async (data: IAccountResetPassword) => {
        try {
            await new AccountValidation().userResetPassword(data);
            const {email, newPassword, otp} = data
            const User = await __User.findOne({ email });
            if (!User) throw new Error(InvalidCredential);

            // Check if OTP matches
            if (User.otp !== otp) {
                throw new Error(InvalidOTP);
            }

            // Check if OTP is expired (valid for 10 minutes)
            const otpExpirationTime = new Date(User.otpCreationTime);
            otpExpirationTime.setMinutes(otpExpirationTime.getMinutes() + 10);
            if (new Date() > otpExpirationTime) {
                throw new Error(InvalidOTP);
            }

            // Hash new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            User.password = hashedPassword;

            // Clear OTP fields
            User.otp = undefined;
            await User.save();

            return { message: "Password reset successfully", success: true };
        } catch (error: any) {
            return { success: false, message: error.message };
        }
    };




}

export default AuthDatasource;
