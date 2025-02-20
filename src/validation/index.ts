import {array, boolean, date, InferType, mixed, number, object, string} from "yup";
import * as yup from 'yup';



const userCreationSchema = object({
    fullName: string().required('Full name is required'),
    phoneNumber: string().required('Phone number is required'),
    email: yup.string()
        .email('Email is invalid')
        .required('Email is required'),
    password: string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least one digit')
        .matches(/[!@#$%^&amp;*(),.?":{}|&lt;&gt;]/, 'Password must contain at least one special character'),
});


const userVerificationSchema = object({
    email: yup.string()
        .email('Email is invalid')
        .required('Email is required')
})



const userLoginSchema = object({
    email: yup.string()
        .email('Email is invalid')
        .required('Email is required'),
    password: string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least one digit')
        .matches(/[!@#$%^&amp;*(),.?":{}|&lt;&gt;]/, 'Password must contain at least one special character'),
});




const userLogoutSchema = object({
    userId: string().required('userId is required'),
});


const userForgotPasswordSchema = object({
    email: yup.string()
        .email('Email is invalid')
        .required('Email is required'),
});

const resetPasswordSchema = object({
    email: yup.string()
        .email('Email is invalid')
        .required('Email is required'),

    otp: yup.string()
        .matches(/^\d{4}$/, 'OTP must be a 4-digit number')
        .required('OTP is required'),

    newPassword: yup.string()
        .required('New password is required')
        .min(6, 'Password must be at least 6 characters')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least one digit')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
});


export type IUserCreationValidation = InferType<typeof userCreationSchema>;
export type IUserVerificationValidation = InferType<typeof userVerificationSchema>;

export type IAccountLogin = InferType<typeof userLoginSchema>;
export type IAccountLogout = InferType<typeof userLogoutSchema>;
export type IAccountForgotPassword = InferType<typeof userForgotPasswordSchema>;
export type IAccountResetPassword = InferType<typeof resetPasswordSchema>;


export class AccountValidation {
     createUser(loginData: IUserCreationValidation): Promise<IUserCreationValidation> {
        return new Promise((resolve, reject) => {
            userCreationSchema.validate(loginData, {abortEarly: false})
                .then((data) => {
                    resolve(data);
                })
                .catch((err) => {
                    const validationErrors = err.inner.map((error: yup.ValidationError) => ({
                        field: error.path || "unknown", 
                        message: error.message,
                        value: error.value
                    }));
                    const errorMessages = validationErrors.map((error:any) => `${error.message}`).join(' | ');
                    // const errorMessages = validationErrors.map((error:any) => `Field: ${error.field}, Message: ${error.message}, Value: ${error.value}`).join(' | ');
                    reject({
                        success: false,
                        message: `${errorMessages}`,
                        errors: validationErrors,
                    });
                });
        });
    }

     verifyUser(loginData: IUserVerificationValidation): Promise<IUserVerificationValidation> {
        return new Promise((resolve, reject) => {
            userVerificationSchema.validate(loginData, {abortEarly: false})
                .then((data) => {
                    resolve(data);
                })
                .catch((err) => {
                    const validationErrors = err.inner.map((error: yup.ValidationError) => ({
                        field: error.path || "unknown",
                        message: error.message,
                        value: error.value
                    }));
                    const errorMessages = validationErrors.map((error:any) => `${error.message}`).join(' | ');
                    // const errorMessages = validationErrors.map((error:any) => `Field: ${error.field}, Message: ${error.message}, Value: ${error.value}`).join(' | ');
                    reject({
                        success: false,
                        message: `${errorMessages}`,
                        errors: validationErrors,
                    });
                });
        });
    }


    userLogin(loginData: IAccountLogin): Promise<IAccountLogin>  {
        return new Promise((resolve, reject) => {
            userLoginSchema.validate(loginData, {abortEarly: true})
                .then((data) => {
                    resolve(data);
                })
                .catch((err) => {
                    reject({
                        success: false,
                        message: err.message,
                    });
                });
        });
    }

    userLogout(loginData: IAccountLogout): Promise<IAccountLogout>  {
        return new Promise((resolve, reject) => {
            userLogoutSchema.validate(loginData, {abortEarly: true})
                .then((data) => {
                    resolve(data);
                })
                .catch((err) => {
                    reject({
                        success: false,
                        message: err.message,
                    });
                });
        });
    }

    userForgotPassword(loginData: IAccountForgotPassword): Promise<IAccountForgotPassword>  {
        return new Promise((resolve, reject) => {
            userForgotPasswordSchema.validate(loginData, {abortEarly: true})
                .then((data) => {
                    resolve(data);
                })
                .catch((err) => {
                    reject({
                        success: false,
                        message: err.message,
                    });
                });
        });
    }

    userResetPassword(loginData: IAccountResetPassword): Promise<IAccountResetPassword>  {
        return new Promise((resolve, reject) => {
            resetPasswordSchema.validate(loginData, {abortEarly: true})
                .then((data) => {
                    resolve(data);
                })
                .catch((err) => {
                    reject({
                        success: false,
                        message: err.message,
                    });
                });
        });
    }


}
