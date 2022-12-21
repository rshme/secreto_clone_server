// Setup Logger
import appRootPath from "app-root-path";
import winston from "winston";
import moment from "moment";
import dotenv from 'dotenv'
if (process.env.APP_ENV !== "production") {
    dotenv.config();
}

const fileOptions = {
    dirname: `${appRootPath}/logs`,
    filename: `${process.env.APP_NAME}-${moment().format('YYYY-MM-DD')}.log`,
    maxsize: 5242880,
    options: {
        format: winston.format.json,
        level: 'info',
        handleExceptions: true
    }
}

const logger = winston.createLogger({
    transports: [
        new winston.transports.File(fileOptions),
        new winston.transports.Console()
    ],
    exitOnError: false
})

export default logger