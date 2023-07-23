let express = require("express");
let debug= require("debug")("server");
let home= require("routes/home");
let about= require("routes/about");

let app= express();
app.use("/", home);
app.use("/about", about);

app.listen(9960, () => {
    console.log("Server started on http://localhost:9960/");
})