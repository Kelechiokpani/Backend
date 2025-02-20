import __User, { accountType } from '../../models/user/User.js';
import __Subscription from '../../models/user/subcription.js';
import jwt from 'jsonwebtoken';
import { AccountValidation } from "../../validation/index.js";
import Base from "../../../base.js";
import { ADMIN_EMAIL, isDev } from "../../helpers/config.js";
import EmailHandlers from "../../helpers/EmailHandlers.js";
import bcrypt from "bcrypt";
const ErrorMessage = "User with this email or phone number already exists";
const InvalidCredential = "Invalid user credential email is not registered";
const InvalidLogin = "Invalid login credentials";
const InvalidOTP = "Invalid OTP  Or OTP has expired, please request a new one.";
class AuthDatasource extends Base {
    constructor() {
        super(...arguments);
        this.registerUser = async (data) => {
            try {
                await new AccountValidation().createUser(data);
                const { fullName, email, phoneNumber, password } = data;
                const user = await __User.findOne({ email });
                if (user)
                    throw new Error(ErrorMessage);
                const membershipId = await Base.generateMembershipId();
                const hashPassword = await this.hashPassword(password);
                const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });
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
                const createdUser = await this.handleMongoError(__User.create(userData));
                await this.handleMongoError(__Subscription.create({ userId: createdUser._id, amount: 0 }));
                const sendEmailService = await new EmailHandlers({ userId: createdUser._id }).InitEmailService();
                await sendEmailService.welcomeEmail();
                // await createdUser.save();
                return {
                    message: "User registered successfully. Click 'Verify Email' to receive a verification link.",
                    success: true,
                    email: createdUser.email,
                    userId: createdUser._id
                };
            }
            catch (error) {
                return ({ success: false, message: error.message || "unable to complete registration process " });
            }
        };
        this.sendVerification = async (data) => {
            try {
                await new AccountValidation().verifyUser(data);
                const { email } = data;
                // const user = await __User.findOne({ email });
                const User = await __User.findOne({ email });
                if (!User)
                    throw new Error(InvalidCredential);
                if (User.isVerified)
                    throw new Error("User is already verified");
                // Generate a new token (optional, in case the old one expired)
                const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });
                // Update user with the new token
                User.verificationToken = verificationToken;
                await User.save();
                // const verificationLink = `https://nuxalle.vercel.app/verify-email?token=${verificationToken}`;
                const verificationLink = `http://localhost:3000/verify-email?token=${verificationToken}`;
                const sendEmailService = await new EmailHandlers({ userId: User._id }).InitEmailService();
                await sendEmailService.verification(verificationLink);
                return { success: true, message: "Verification email sent. Please check your inbox." };
            }
            catch (error) {
                return { success: false, message: error.message || "Unable to send verification email" };
            }
        };
        this.verifyEmail = async (token) => {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const User = await __User.findOne({ email: decoded.email });
                if (!User)
                    throw new Error(InvalidCredential);
                if (User.isVerified)
                    throw new Error("Email already verified");
                // Mark user as verified
                User.isVerified = true;
                User.verificationToken = undefined; // Clear the token after verification
                await User.save();
                return { success: true, message: "Email verified successfully. You can now log in." };
            }
            catch (error) {
                return { success: false, message: error.message || "Invalid or expired verification link." };
            }
        };
        this.userLogin = async (data, res) => {
            try {
                await new AccountValidation().userLogin(data);
                const { email, password } = data;
                const User = await __User.findOne({ email });
                if (!User)
                    throw new Error(InvalidCredential);
                const isMatch = await this.comparePasswords(password, User.password);
                if (!isMatch)
                    throw new Error(InvalidLogin);
                const token = jwt.sign({ id: User._id, role: User.role }, process.env.JWT_SECRET || "CLIENT_SECRET_KEY", { expiresIn: '1h' });
                // Set the JWT in a cookie
                User.currentToken = token;
                await User.save();
                // secure: process.env.NODE_ENV === "production",
                res.cookie("token", token, {
                    httpOnly: true, // Prevent JavaScript access to the cookie
                    secure: !isDev, // Set secure flag only in production
                    sameSite: "strict", // Protects against CSRF
                    // secure:false,
                    // sameSite: "lax",
                    maxAge: 60 * 60 * 1000 // 1 hour expiration
                });
                return {
                    success: true,
                    message: 'Login successful',
                    userId: User._id,
                    email: User.email,
                    token,
                };
            }
            catch (error) {
                return ({ success: false, message: error.message || "unable to complete login process " });
            }
        };
        this.forgotUserPassword = async (data) => {
            await new AccountValidation().userForgotPassword(data);
            const { email } = data;
            const userData = await __User.findOne({ email });
            if (!userData)
                throw new Error(InvalidCredential);
            const otp = await Base.generateOTP();
            const otpRetryTime = new Date();
            const otpCreationTime = new Date();
            if (userData) {
                const sendEmailService = await new EmailHandlers({ userId: userData._id }).InitEmailService();
                sendEmailService.forgotPasswordEmail(otp);
                userData.otp = otp;
                userData.otpRetryTime = otpRetryTime;
                userData.otpCreationTime = otpCreationTime;
                await userData.save();
            }
            return { message: "Otp successfully sent to your email", email: userData.email, success: true, };
        };
        this.resetPassword = async (data) => {
            try {
                await new AccountValidation().userResetPassword(data);
                const { email, newPassword, otp } = data;
                const User = await __User.findOne({ email });
                if (!User)
                    throw new Error(InvalidCredential);
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
            }
            catch (error) {
                return { success: false, message: error.message };
            }
        };
    }
}
export default AuthDatasource;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb250cm9sbGVycy91c2VyL2F1dGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxNQUFNLEVBQUUsRUFBQyxXQUFXLEVBQVEsTUFBTSwyQkFBMkIsQ0FBQztBQUNyRSxPQUFPLGNBQWMsTUFBTyxrQ0FBa0MsQ0FBQztBQUMvRCxPQUFPLEdBQUcsTUFBTSxjQUFjLENBQUM7QUFDL0IsT0FBTyxFQUNILGlCQUFpQixFQUtwQixNQUFNLDJCQUEyQixDQUFDO0FBQ25DLE9BQU8sSUFBSSxNQUFNLGtCQUFrQixDQUFDO0FBQ3BDLE9BQU8sRUFBQyxXQUFXLEVBQUUsS0FBSyxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDM0QsT0FBTyxhQUFhLE1BQU0sZ0NBQWdDLENBQUM7QUFDM0QsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFDO0FBRzVCLE1BQU0sWUFBWSxHQUFHLHFEQUFxRCxDQUFDO0FBQzNFLE1BQU0saUJBQWlCLEdBQUcsaURBQWlELENBQUM7QUFDNUUsTUFBTSxZQUFZLEdBQUcsMkJBQTJCLENBQUM7QUFDakQsTUFBTSxVQUFVLEdBQUcsNERBQTRELENBQUM7QUFHaEYsTUFBTSxjQUFlLFNBQVEsSUFBSTtJQUFqQzs7UUFFVyxpQkFBWSxHQUFHLEtBQUssRUFBRSxJQUE2QixFQUFFLEVBQUU7WUFDMUQsSUFBSSxDQUFDO2dCQUNELE1BQU0sSUFBSSxpQkFBaUIsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDL0MsTUFBTSxFQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBQyxHQUFHLElBQUksQ0FBQTtnQkFDckQsTUFBTSxJQUFJLEdBQUcsTUFBTSxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQztnQkFDM0MsSUFBSSxJQUFJO29CQUFFLE1BQU0sSUFBSSxLQUFL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