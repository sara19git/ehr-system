export const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // طباعة الخطأ في الـ Console

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV ? null : err.stack, // إخفاء التفاصيل في الإنتاج
    });
};


