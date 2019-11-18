require('dotenv').config({
    path: './config/.env'
});

const express = require('express');
const router = express.Router();

const request = require('request');
const {
    createLogger,
    format,
    transports
} = require('winston');
const {
    combine,
    label,
    printf
} = format;
const moment = require('moment');
require('moment-timezone');

const token = process.env.TOKEN;
const bot_id = process.env.BOT_ID;

moment.tz.setDefault("Asia/Seoul");

const logFormat = printf(({
    level,
    message
}) => `[${timeStampFormat()}] ${level}: ${message}`);
const logger = createLogger({
    format: logFormat,
    transports: [
          new transports.File({
            filename: 'logs/error.log',
            level: 'error'
        }),
    new transports.File({
            filename: 'logs/info.log',
            level: 'info'
        }),
    new transports.File({
            filename: 'logs/logs.log'
        }),
      new transports.Console()
  ]
});

const positiveMessages = [
    '마자마자~', '그럴 수 있지', '그럼그럼', '그치그치',
    '좋은데?', '괜찮은데?', '나쁘지 않은데?', '오키오키',
    ':martin:', ':sunshine:'];

let options = {
    uri: 'https://slack.com/api/chat.postMessage',
    qs: {
        token: token
    }
};

router.post('/action-endpoint', function (req, res) {
    const reqBody = req.body;
    let result;

    if (reqBody.event.type === 'message' && reqBody.event.bot_id !== bot_id) {
        result = sendReaction(reqBody.event, makeRandomNumberLessThan(10));
    }

    const logMessage = "TYPE=" + reqBody.event.type + " SUBTYPE=" + reqBody.event.subtype + " USERNAME=" + reqBody.event.username + " CHANNEL_TYPE=" + reqBody.event.channel_type + " RESULT_TEXT=" + result;
    logger.info(logMessage);

    res.status(200).json(result);
});

const sendReaction = function (event, number) {
    if (event.thread_ts) {
        return '댓글이란다~';
    }
    if (number < 9) {
        return '아무 말도 하지 않겠다';
    }

    const channel_id = event.channel;
    const messageIndex = makeRandomNumberLessThan(positiveMessages.length);

    options.qs.channel = channel_id;
    options.qs.text = positiveMessages[messageIndex];

    request.post(options, function (err, response, body) {
        if (err) {
            logger.error(err);
            return;
        }
        
        logger.info("'" + positiveMessages[messageIndex] + "'라고 맞장구 완료");
    });

    return positiveMessages[messageIndex];
}

const makeRandomNumberLessThan = function (maxNumber) {
    return Math.floor(Math.random() * maxNumber);
}

const timeStampFormat = function () {
    return moment().format('YYYY-MM-DD HH:mm:ss.SSS ZZ');
};

module.exports = router;
