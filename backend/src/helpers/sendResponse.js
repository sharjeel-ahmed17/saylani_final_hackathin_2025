export const sendRepsonse = (res, statusCode, error, message,data) => {
    res.status(statusCode).json({
        error,
        message,
        data
    })
}