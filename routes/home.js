let express = require("express");
let path= require("path");

let router= express.Router();
router("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/home.html"));
});

exports.module = router;