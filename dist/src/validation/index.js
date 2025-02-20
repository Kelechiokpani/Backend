import { object, string } from "yup";
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
});
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
export class AccountValidation {
    createUser(loginData) {
        return new Promise((resolve, reject) => {
            userCreationSchema.validate(loginData, { abortEarly: false })
                .then((data) => {
                resolve(data);
            })
                .catch((err) => {
                const validationErrors = err.inner.map((error) => ({
                    field: error.path || "unknown",
                    message: error.message,
                    value: error.value
                }));
                const errorMessages = validationErrors.map((error) => `${error.message}`).join(' | ');
                // const errorMessages = validationErrors.map((error:any) => `Field: ${error.field}, Message: ${error.message}, Value: ${error.value}`).join(' | ');
                reject({
                    success: false,
                    message: `${errorMessages}`,
                    errors: validationErrors,
                });
            });
        });
    }
    verifyUser(loginData) {
        return new Promise((resolve, reject) => {
            userVerificationSchema.validate(loginData, { abortEarly: false })
                .then((data) => {
                resolve(data);
            })
                .catch((err) => {
                const validationErrors = err.inner.map((error) => ({
                    field: error.path || "unknown",
                    message: error.message,
                    value: error.value
                }));
                const errorMessages = validationErrors.map((error) => `${error.message}`).join(' | ');
                // const errorMessages = validationErrors.map((error:any) => `Field: ${error.field}, Message: ${error.message}, Value: ${error.value}`).join(' | ');
                reject({
                    success: false,
                    message: `${errorMessages}`,
                    errors: validationErrors,
                });
            });
        });
    }
    userLogin(loginData) {
        return new Promise((resolve, reject) => {
            userLoginSchema.validate(loginData, { abortEarly: true })
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
    userLogout(loginData) {
        return new Promise((resolve, reject) => {
            userLogoutSchema.validate(loginData, { abortEarly: true })
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
    userForgotPassword(loginData) {
        return new Promise((resolve, reject) => {
            userForgotPasswordSchema.validate(loginData, { abortEarly: true })
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
    userResetPassword(loginData) {
        return new Promise((resolve, reject) => {
            resetPasswordSchema.validate(loginData, { abortEarly: true })
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdmFsaWRhdGlvbi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWlELE1BQU0sRUFBRSxNQUFNLEVBQUMsTUFBTSxLQUFLLENBQUM7QUFDbkYsT0FBTyxLQUFLLEdBQUcsTUFBTSxLQUFLLENBQUM7QUFJM0IsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLENBQUM7SUFDOUIsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQztJQUNwRCxXQUFXLEVBQUUsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLDBCQUEwQixDQUFDO0lBQzFELEtBQUssRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFO1NBQ2QsS0FBSyxDQUFDLGtCQUFrQixDQUFDO1NBQ3pCLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQztJQUNsQyxRQUFRLEVBQUUsTUFBTSxFQUFFO1NBQ2IsUUFBUSxDQUFDLHNCQUFzQixDQUFDO1NBQ2hDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsd0NBQXdDLENBQUM7U0FDaEQsT0FBTyxDQUFDLE9BQU8sRUFBRSxxREFBcUQsQ0FBQztTQUN2RSxPQUFPLENBQUMsT0FBTyxFQUFFLHFEQUFxRCxDQUFDO1NBQ3ZFLE9BQU8sQ0FBQyxPQUFPLEVBQUUsMENBQTBDLENBQUM7U0FDNUQsT0FBTyxDQUFDLGtDQUFrQyxFQUFFLHNEQUFzRCxDQUFDO0NBQzNHLENBQUMsQ0FBQztBQUdILE1BQU0sc0JBQXNCLEdBQUcsTUFBTSxDQUFDO0lBQ2xDLEtBQUssRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFO1NBQ2QsS0FBSyxDQUFDLGtCQUFrQixDQUFDO1NBQ3pCLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQztDQUNyQyxDQUFDLENBQUE7QUFJRixNQUFNLGVBQWUsR0FBRyxNQUFNLENBQUM7SUFDM0IsS0FBSyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUU7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