"use strict";
exports.__esModule = true;
exports.router = void 0;
var express_1 = require("express");
var router = (0, express_1.Router)();
exports.router = router;
router.get('/datause', function (req, res) {
    res.send("data use successfuly");
});
