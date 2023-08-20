let express= require("express");
let home= require("./route/home-route");
let app= express();

app.use(home);

app.listen(9960, () => {
  console.log("Server started at http://localhost:9960/");
})
