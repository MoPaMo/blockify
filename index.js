const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT != undefined ? process.env.PORT : 8080;
const Database = require("@replit/database");
const db = new Database();
const session = require('express-session')
app.use(session({
  secret: process.env.cookieSecret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
var SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: process.env.clientId,
  clientSecret: process.env.clientSecret,
  redirectUri: process.env.callbackUrl
});

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

app.get("/login", (req, res) => {
  state = 'some-state-of-my-choice';
  var scopes = ['playlist-modify-public', 'playlist-read-collaborative']

  // Create the authorization URL
  var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

  res.redirect(authorizeURL);
})

app.get("/cb", (req, res)=>{
  console.log(res);
})

app.listen(port, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", port);
});