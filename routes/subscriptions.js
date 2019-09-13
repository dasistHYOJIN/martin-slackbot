require('dotenv').config();

const express = require('express');
const router = express.Router();

router.post('/action-endpoint', function (req, res) {
    const reqBody = req.body;
    console.log(reqBody);

    if (reqBody.event.type === 'message') {
        const channel_id = reqBody.event.channel;
    }

    res.status(200).json(reqBody.body);
});

module.exports = router;
