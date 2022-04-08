const envConfig = require("dotenv").config().parsed;

module.exports={
    MONGO_URL : `mongodb://${envConfig.MONGO_USER}:${envConfig.MONGO_PW}@localhost:27017/${envConfig.MONGO_DB_NAME}?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false`,
         PORT : envConfig.PORT,
         LOG: {
            morgan: ":param:date[iso] :status :method :url :response-time ms :res[content-length] bytes",
        },
         HTTP_STATUS: [
            { code: 200, name: "ok" },
            { code: 400, name: "badRequest", defaultMessage: "잘못된 요청입니다." },
            {
                code: 401,
                name: "unauthorized",
                defaultMessage: "해당 API의 접근할 권한이 없습니다.",
            },
            {
                code: 403,
                name: "forbidden",
                defaultMessage: "해당 API의 접근이 금지되었습니다.",
            },
            {
                code: 404,
                name: "notFound",
                defaultMessage: "해당 API가 존재하지 않습니다.",
            },
            {
                code: 409,
                name: "notification",
                defaultMessage: "Just notification",
            },
            {
                code: 412,
                name: "preconditionFailed",
                defaultMessage: "탈퇴된 상태입니다.",
            },
            {
                code: 500,
                name: "internalServerError",
                defaultMessage: "서버 오류가 발생했습니다.",
            },
            {
                code: 501,
                name: "notImplemented",
                defaultMessage: "해당 API는 구현 예정입니다.",
            },
            {
                code: 503,
                name: "serviceUnavailable",
                defaultMessage: "일시적인 서버 오류가 발생했습니다.",
            },
        ],
}