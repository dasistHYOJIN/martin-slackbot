require('dotenv').config();

const express = require('express');
const app = express();
app.use(express.json()); // 이걸 안해주니까 요청에서 body를 못찾아

/** routes **/
const subscriptions = require('./routes/subscriptions');
const message = require('./routes/message');

app.set('port', (process.env.PORT || 3000));

app.use('/subscriptions', subscriptions);
app.use('/message', message);

app.get('/', function (req, res) {
    res.send('<h1>MARTIN BOT</h1>');
});

app.listen(app.get('port'), () =>
    console.log('APP IS RUNNING ON [' + app.get('port') + ']')
);
