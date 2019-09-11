const express = require("express");
const app = express();
app.use(express.json()); // 이걸 안해주니까 요청에서 body를 못찾아

app.set("port", (process.env.PORT || 3000));

app.get("/", function (req, res) {
    res.send("Hello World!");
});

app.post('/action-endpoint', function (req, res) {
    console.log(req.body);
    res.status(200).json(req.body);
});

app.listen(app.get("port"), function () {
    console.log("APP IS RUNNING ON [" + app.get("port") + "]");
});
