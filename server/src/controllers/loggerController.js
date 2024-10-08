
const { createLogger,
        transports,
        format} = require('winston');

const logger = createLogger({
  level: 'info',
  format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.json()
  ),
//   defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    //console e best message usage er jnne use hoy
    // new transports.Console({
    //     format: format.combine(
    //       format.colorize(),
    //       format.simple()
    //     )
    // })

    //info file make kore sekhane message show korano
    new transports.File({
        filename: 'src/logs/info.log',
        level: 'info',
        maxsize: 5242880, //5MB
        maxFiles: 2
    }),
    //error info er jonne
    new transports.File({
        filename: 'src/logs/error.log',
        level: 'error',
        maxsize: 5242880, //5MB
    }),
  ],
});



module.exports = logger





// //
// // If we're not in production then log to the `console` with the format:
// // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// //
// if (process.env.NODE_ENV !== 'production') {
//   logger.add(new winston.transports.Console({
//     format: winston.format.simple(),
//   }));
// }