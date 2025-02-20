import dotenv from "dotenv";
dotenv.config();


export const {
    MONGO_URL,
    NODE_ENV,
    FRONT_END_DOMAIN,
    PORT,
    ADMIN_EMAIL,

    SEND_TO_LOCAL,

    SMTP_HOST,
    SMTP_PORT,
    SMTP_USERNAME,
    SMTP_PASSWORD,


    SECRET_KEY,

    PAY_STACK_SECRET_KEYS,
    PAY_STACK_PUBLIC_KEYS,


    FLUTTER_WAVE_TEST_PUBLIC_KEY,
    FLUTTER_WAVE_TEST_SECRET_KEY,

} = process.env;

// export const isDev = NODE_ENV === "development";
export const isDev = NODE_ENV !== "production";
dotenv.config({path: ['.env', '.env.keys']});


export const cookieOptions = {
    domain: isDev ? "localhost" : " ",
    httpOnly: true,
};

const envs:any = {
    MONGO_URL,
    NODE_ENV,
    FRONT_END_DOMAIN,
    PORT,
    ADMIN_EMAIL,

    SEND_TO_LOCAL,

    SMTP_HOST,
    SMTP_PORT,
    SMTP_USERNAME,
    SMTP_PASSWORD,



    SECRET_KEY,

    PAY_STACK_SECRET_KEYS,
    PAY_STACK_PUBLIC_KEYS,

    FLUTTER_WAVE_TEST_PUBLIC_KEY,
    FLUTTER_WAVE_TEST_SECRET_KEY,
};

const list = Object.keys(envs);
// const errors = {};
const errors: { [key: string]: string } = {};
for (const listItem of list) {
    if (!envs[listItem]) {
        errors[listItem] = `${listItem} is not defined`;
    }
}

if (Object.keys(errors).length > 0) {
    const message = `ENV Error, the following ENV are not set:`;
    console.error(message);
    console.table(errors);
    throw new Error("Fix Env and rebuild");
}
