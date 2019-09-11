const express = require('express');
const router = express.Router();

router.post('/action-endpoint', function (req, res) {
    console.log(req.body);
    res.status(200).json(req.body);
});

module.exports = router;