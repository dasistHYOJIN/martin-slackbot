require('dotenv').config({
    path: './config/.env'
});

const express = require('express');
const router = express.Router();

const request = require('request');
const moment = require('moment');
require('moment-timezone');

const token = process.env.TOKEN;
const bot_id = process.env.BOT_ID;

moment.tz.setDefault("Asia/Seoul");

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
        result = sendReaction(reqBody.event);
    }

    console.log("=====================");
    console.log(reqBody);
    console.log("=====================");

    console.log("[" + moment().format('YYYY-MM-DD HH:mm:ss') + "] " +
        reqBody.event.channel_type + ": " + reqBody.event.user + " -> " + result);

    res.status(200).json(result);
});

const sendReaction = function (event) {
    if (event.thread_ts) {
        return '댓글이란다~';
    }
    if (makeRandomNumberLessThan(10) < 8) {
        return '아무 말도 하지 않겠다';
    }

    const channel_id = event.channel;
    const messageIndex = makeRandomNumberLessThan(positiveMessages.length);

    options.qs.channel = channel_id;
    options.qs.text = positiveMessages[messageIndex];

    request.post(options, function (err, response, body) {
        if (err) {
            console.error("err >> " + err);
            return;
        }
        console.log(body);
    });

    return positiveMessages[messageIndex];
}

const makeRandomNumberLessThan = function (maxNumber) {
    return Math.floor(Math.random() * maxNumber);
}

module.exports = router;
