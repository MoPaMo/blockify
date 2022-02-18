const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT != undefined ? process.env.PORT : 8080;
const sqlite3 = require("sqlite3").verbose();

var dberror = false;
let db = new sqlite3.Database("./db.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
    dberror = err.message;
  }
  console.log("Connected to the database.");
});

var SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: process.env.clientId,
  clientSecret: process.env.clientSecret,
  redirectUri: process.env.callbackURL
});

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});
app.listen(port, function(err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", port);
});