import { sendRepsonse } from "../helpers/sendResponse.js"

export const UserController = async(req,res) => {
    sendRepsonse(res,200,true,"User found",req.user)
}