import 'dotenv/config' 

export const envConfig = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    AUTH_SECRET_TOKEN: process.env.AUTH_SECRET_TOKEN,
    REFRESH_SECRET_TOKEN: process.env.REFRESH_SECRET_TOKEN,

    //email

    EMAIL_HOST:process.env.EMAIL_HOST,
    EMAIL_PORT:process.env.EMAIL_PORT,
    EMAIL_USER:process.env.EMAIL_USER,
    EMAIL_PASS:process.env.EMAIL_PASS,
}