const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT != undefined ? process.env.PORT : 8080;

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});
app.listen(port, function(err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", port);
});