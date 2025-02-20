import nodemailer from "nodemailer";
import ejs from "ejs";
import fs from "fs";
import path from "path";
import __User from "../models/user/User.js";
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
export var TemplateName;
(function (TemplateName) {
    TemplateName["welcome"] = "welcome";
    TemplateName["verification"] = "verification";
    TemplateName["forgotPassword"] = "forgotPassword";
    TemplateName["verifyEmail"] = "verifyEmail";
    TemplateName["otpLogin"] = "otpLogin";
    TemplateName["serviceEnquiry"] = "serviceEnquiry";
})(TemplateName || (TemplateName = {}));
class EmailHandlers {
    constructor({ userId }) {
        this.templates = TemplateName;
        console.log(userId, "userId");
        this.userId = userId;
    }
    async getTemplate(template, data) {
        const result = ejs.compile(this.getTemplateFile(template), {
            beautify: false,
        });
        return result({
            ...data,
            ...defaultEmailRecord,
        });
    }
    getTemplateFile(template) {
        return fs
            .readFileSync(path.join(process.cwd(), "src", "email_templates", `${template}.html`))
            .toString("utf8");
    }
    // private getTemplateFile(template: TemplateName): string {
    //     const templatePath = path.join(__dirname, "../email_templates", `${template}.html`);
    //     return fs.readFileSync(templatePath, "utf8");
    // }
    createTransporter() {
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
        if (!user)
            throw new Error("Unable to validate user");
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
    async sendMail(to, subject, templateName, data, from = "Nuxalle <devkelly539@gmail.com>") {
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
        }
        catch (error) {
            console.error("Error sending email:", error);
            throw error; // re-throw to be handled in the caller
        }
    }
    // Template call
    async welcomeEmail() {
        if (!this.userData)
            throw new Error("Ensure that InitEmailService is called first");
        const message = {
            body: "",
            userEmail: this.userData.email,
            title: "Welcome to Nuxalle Inc!",
            greeting: `Hello ${this.userData.fullName.toUpperCase()}`,
        };
        try {
            await this.sendMail(this.userData.email, "Welcome to Nuxalle Inc", this.templates.welcome, message);
            console.log("Welcome email sent successfully");
        }
        catch (error) {
            console.log("Error sending welcome email:", error);
        }
    }
    async verification(verificationLink) {
        if (!this.userData)
            throw new Error("Ensure that InitEmailService is called first");
        const message = {
            body: "",
            userEmail: this.userData.email,
            title: "Verify Your Email - Nuxalle Inc",
            greeting: `Hello ${this.userData.fullName.toUpperCase()}`,
            verificationLink,
        };
        try {
            await this.sendMail(this.userData.email, "Verify Your Email - Nuxalle Inc", this.templates.verification, message);
            console.log("Verification email sent successfully");
        }
        catch (error) {
            console.log("Error sending verification email:", error);
        }
    }
    async forgotPasswordEmail(otp) {
        if (!this.userData)
            throw new Error("Ensure that InitEmailService is called first");
        const message = {
            body: "",
            userEmail: this.userData.email,
            title: "Reset Password OTP",
            greeting: `Hello ${this.userData.fullName.toUpperCase()}`,
            token: otp,
        };
        try {
            await this.sendMail(this.userData.email, "Reset Password", this.templates.forgotPassword, message);
            console.log("Forgot password email sent successfully");
        }
        catch (error) {
            console.log("Error sending forgot password email:", error);
        }
    }
}
export default EmailHandlers;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW1haWxIYW5kbGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oZWxwZXJzL0VtYWlsSGFuZGxlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxVQUFVLE1BQU0sWUFBWSxDQUFDO0FBQ3BDLE9BQU8sR0FBRyxNQUFNLEtBQUssQ0FBQztBQUN0QixPQUFPLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFDcEIsT0FBTyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBQ3hCLE9BQU8sTUFBZSxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELDJEQUEyRDtBQUMzRCxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDMUYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUlwQyxNQUFNLFVBQVUsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNsRCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBRzNDLE1BQU0sa0JBQWtCLEdBQUc7SUFDdkIsUUFBUSxFQUFFLHlDQUF5QztJQUNuRCxPQUFPLEVBQUUsb0NBQW9DO0lBQzdDLFNBQVMsRUFBRSwwQ0FBMEM7Q0FDeEQsQ0FBQztBQVlGLE1BQU0sQ0FBTixJQUFZLFlBVVg7QUFWRCxXQUFZLFlBQVk7SUFDcEIsbUNBQW1CLENBQUE7SUFDbkIsNkNBQTZCLENBQUE7SUFDN0IsaURBQWlDLENBQUE7SUFJakMsMkNBQTJCLENBQUE7SUFDM0IscUNBQXFCLENBQUE7SUFDckIsaURBQWlDLENBQUE7QUFDckMsQ0FBQyxFQVZXLFlBQVksS0FBWixZQUFZLFFBVXZCO0FBRUQsTUFBTSxhQUFhO0lBS2YsWUFBWSxFQUFDLE1BQU0sRUFBSztRQUZqQixjQUFTLEdBQUcsWUFBWSxDQUFDO1FBRzVCLE9BQU8s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