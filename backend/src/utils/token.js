import { sendRepsonse } from "../helpers/sendResponse.js"
import jwt from 'jsonwebtoken'
import { envConfig } from "../lib/configs/env.config.js"

export const generateTokens = (user) => {
    const generateAccessToken = jwt.sign(user,envConfig.AUTH_SECRET_TOKEN,{expiresIn:'15m'})  
    const generateRefreshToken = jwt.sign(user,envConfig.REFRESH_SECRET_TOKEN,{expiresIn:'7d'})
    return {generateAccessToken,generateRefreshToken} 
}

