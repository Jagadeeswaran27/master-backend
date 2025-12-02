export const sendResponse = (res, statusCode, data, message = "Success") => {
    res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};
//# sourceMappingURL=response.js.map