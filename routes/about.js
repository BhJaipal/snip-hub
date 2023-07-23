let express = require("express");
let path= require("path");

let router = express.Router();
router.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/about.html"));
});
exports.module = router;