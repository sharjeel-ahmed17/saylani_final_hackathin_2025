import { sendRepsonse } from "../helpers/sendResponse.js"

export const validateRequest = (validationSchema) => (req,res,next) => {
    const { error } = validationSchema.validate(req.body)
    if (error) return sendRepsonse(res, 400, true, error.message, null) 
    next()
}