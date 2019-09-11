const express = require("express");
const app = express();

app.set("port", (process.env.PORT || 3000));

app.get("/", function (req, res) {
    res.send("Hello World!");
});

app.listen(app.get("port"), function () {
    console.log("APP IS RUNNING ON [" + app.get("port") + "]");
});
