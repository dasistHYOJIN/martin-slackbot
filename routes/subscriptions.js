require('dotenv').config();

const express = require('express');
const router = express.Router();

const request = require('request');
const token = process.env.TOKEN;
const bot_id = process.env.BOT_ID;

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

    if (reqBody.event.type === 'message' && reqBody.event.bot_id !== bot_id) {
        sendReaction(reqBody.event);
    }

    res.status(200).json(reqBody.body);
});

const sendReaction = function (event) {
    const channel_id = event.channel;
    const messageIndex = makeRandomNumberLessThan(positiveMessages.length);

    options.qs.channel = channel_id;
    options.qs.text = positiveMessages[messageIndex];

    if (makeRandomNumberLessThan(10) < 8) {
        console.log('아무 말도 하지 않겠다');
        return;
    }

    request.post(options, function (err, response, body) {
        if (err) {
            console.error("err >> " + err);
            return;
        }
        console.log(body);
    });
}

const makeRandomNumberLessThan = function (maxNumber) {
    return Math.floor(Math.random() * maxNumber);
}

module.exports = router;
