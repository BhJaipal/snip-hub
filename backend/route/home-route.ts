const express= require("express");
const path= require("path");

let homeRoute= express.Router();

homeRoute.get("/", (req: any, res: any) => {
  res.sendFile(path.join(__dirname, "../public/home.html"));
});

homeRoute.get("/src/home.js", (req: any, res: any) => {
  res.sendFile(path.join(__dirname, "../public/src/home.js"));
});

homeRoute.get("/src/highlighting.js", (req: any, res: any) => {
  res.sendFile(path.join(__dirname, "../public/src/highlighting.js"));
});

homeRoute.get("/src/home.css", (req: any, res: any) => {
  res.sendFile(path.join(__dirname, "../public/src/home.css"));
});

homeRoute.get("/home.svg", (req: any, res: any) => {
  res.sendFile(path.join(__dirname, "../public/image/home.svg"));
});

module.exports= homeRoute;
