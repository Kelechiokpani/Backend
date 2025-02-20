import mongoose, { ObjectId } from "mongoose";
import nodemailer from "nodemailer";
import ejs from "ejs";
import fs from "fs";
import path from "path";
import __User, {IUser} from "../models/user/User.js";
// import __User, {IUser} from "../../src/email_templates";
import { SMTP_HOST, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD } from "../helpers/config.js";
import { fileURLToPath } from 'url';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const defaultEmailRecord = {
    facebook: "https://web.facebook.com/kreativerockhq",
    twitter: "https://twitter.com/kreativerockhq",
    instagram: "https://www.instagram.com/kreativerockhq",
};

interface IEmailData {
    body: string;
    token?: string;
    userEmail: string;
    title: string;
    resetOTP?: string;
    greeting: string;
    verificationLink?:any;
}

export enum TemplateName {
    welcome = "welcome",
    verification = "verification",
    forgotPassword = "forgotPassword",



    verifyEmail = "verifyEmail",
    otpLogin = "otpLogin",
    serviceEnquiry = "serviceEnquiry",
}

class EmailHandlers {
    private readonly userId: ObjectId;
    private userData!: IUser;
    public templates = TemplateName;

    constructor({userId}:any) {
        console.log(userId, "userId")
        this.userId = userId;
    }

    private async getTemplate(template: TemplateName, data: IEmailData) {
        const result = ejs.compile(this.getTemplateFile(template), {
            beautify: false,
        });
        return result({
            ...data,
            ...defaultEmailRecord,
        });
    }

    private getTemplateFile(template: TemplateName): string {
        return fs
            .readFileSync(path.join(process.cwd(), "src", "email_templates", `${template}.html`))
            .toString("utf8");
    }

    // private getTemplateFile(template: TemplateName): string {
    //     const templatePath = path.join(__dirname, "../email_templates", `${template}.html`);
    //     return fs.readFileSync(templatePath, "utf8");
    // }


    private createTransporter() {
        return nodemailer.createTransport({
            host: SMTP_HOST,
            port: Number(SMTP_PORT),
            auth: {
                user: SMTP_USERNAME,
                pass: SMTP_PASSWORD,
            },
            secure: SMTP_PORT === "465",
            // secure: true, // Use SSL
        });
    }

    async InitEmailService() {
        const user = await __User.findOne({ _id: this.userId });
        if (!user) throw new Error("Unable to validate user");
        this.userData = user;
        return this;
    }


    // async sendMail(to: string, subject: string, templateName: TemplateName, data: {
    //     greeting: string;
    //     userEmail: string;
    //     body: string;
    //     title: string
    // }, from = "Nuxalle <info@nuxalle.com>") {
    //     const transporter = this.createTransporter();
    //     const mailOptions = {
    //         from,
    //         to,
    //         subject,
    //         html: await this.getTemplate(templateName, { ...data}),
    //     };
    //      transporter.sendMail(mailOptions, (error: any, info: any) => {
    //         if (error) {
    //             console.error("Error sending email:", error);
    //         } else {
    //             console.log("Email sent:", info.response);
    //         }
    //     });
    // }


    async sendMail(to: string, subject: string, templateName: TemplateName, data: IEmailData, from = "Nuxalle <devkelly539@gmail.com>") {
        const transporter = this.createTransporter();

        try {
            const htmlContent = await this.getTemplate(templateName, { ...data });
            const mailOptions = {
                from,
                to,
                subject,
                html: htmlContent,
            };

            const info = await transporter.sendMail(mailOptions);
            console.log("Email sent successfully:", info.response);
        } catch (error) {
            console.error("Error sending email:", error);
            throw error;  // re-throw to be handled in the caller
        }
    }

    // Template call
    async welcomeEmail() {
        if (!this.userData) throw new Error("Ensure that InitEmailService is called first");
        const message: IEmailData = {
            body: "",
            userEmail: this.userData.email,
            title: "Welcome to Nuxalle Inc!",
            greeting: `Hello ${this.userData.fullName.toUpperCase()}`,
        };

        try {
            await this.sendMail(
                this.userData.email,
                "Welcome to Nuxalle Inc",
                this.templates.welcome,
                message
            );
            console.log("Welcome email sent successfully");
        } catch (error) {
            console.log("Error sending welcome email:", error);
        }
    }

    async verification(verificationLink: any) {
        if (!this.userData) throw new Error("Ensure that InitEmailService is called first");

        const message: IEmailData = {
            body: "",
            userEmail: this.userData.email,
            title: "Verify Your Email - Nuxalle Inc",
            greeting: `Hello ${this.userData.fullName.toUpperCase()}`,
            verificationLink,
        };

        try {
            await this.sendMail(
                this.userData.email,
                "Verify Your Email - Nuxalle Inc",
                this.templates.verification,
                message
            );
            console.log("Verification email sent successfully");
        } catch (error) {
            console.log("Error sending verification email:", error);
        }
    }

    async forgotPasswordEmail(otp: string) {
        if (!this.userData) throw new Error("Ensure that InitEmailService is called first");
        const message: IEmailData = {
            body: "",
            userEmail: this.userData.email,
            title: "Reset Password OTP",
            greeting: `Hello ${this.userData.fullName.toUpperCase()}`,
            token: otp,
        };

        try {
            await this.sendMail(
                this.userData.email,
                "Reset Password",
                this.templates.forgotPassword,
                message
            );
            console.log("Forgot password email sent successfully");
        } catch (error) {
            console.log("Error sending forgot password email:", error);
        }
    }



}

export default EmailHandlers;
