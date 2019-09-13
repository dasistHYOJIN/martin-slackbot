require('dotenv').config();

const express = require('express');
const app = express();
app.use(express.json());

const subscriptions = require('./routes/subscriptions');

app.set('port', (process.env.PORT || 3000));

app.use('/subscriptions', subscriptions);

app.get('/', function (req, res) {
    res.send('<h1>MARTIN BOT</h1>');
});

app.listen(app.get('port'), () =>
    console.log('APP IS RUNNING ON [' + app.get('port') + ']')
);
