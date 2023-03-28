"use strict";
exports.__esModule = true;
var express = require("express");
var router_1 = require("./router/router");
var app = express();
var port = 4000;
app.use('/', router_1.router);
app.listen(port, function () {
    console.log("server is running localhost:".concat(port));
});
