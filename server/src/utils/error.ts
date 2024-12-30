export const ErrorHandler = (message: string, statusCode: number)  => {
    return {
        error: message,
        statusCode,
    };
}