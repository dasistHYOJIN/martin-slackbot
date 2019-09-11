require('dotenv').config();

const express = require('express');
const router = express.Router();

const { RTMClient } = require('@slack/client');
const { WebClient } = require('@slack/client');
const token = process.env.TOKEN;

const rtm = new RTMClient(token);
const web = new WebClient(token);

if (!token) {
    console.log('토큰이 없다!');
    process.exitCode = 1;
    return;
}

rtm.on('message', (event) => {
  console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
});

module.exports = router;