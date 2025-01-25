import { sendRepsonse } from "../helpers/sendResponse.js";
import jwt from 'jsonwebtoken'
import { UserModel } from "../modals/user.modal.js";
export const authentication = async (req,res,next) => {
    try {
        const bearerToken = req?.headers?.authorization
        
        const splitToken = bearerToken?.split(' ')[1]
        if (!splitToken) return sendRepsonse(res, 401, true, "Token not provided", null)
        
        // decode token 
        const decode = jwt.verify(splitToken,process.env.AUTH_SECRET)
        if (decode) {
            // finduser
            const findUser = await UserModel.findById(decode._id).lean()
            if (!findUser) return sendRepsonse(res, 401, true, "User not found")
            req.user = findUser
            next()
        }
        
        next()

    } catch (error) {
        return sendRepsonse(res, 500, true, error.message,null)
    }
}