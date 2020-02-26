require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');
const http = require("http");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
  dir: "./"
});
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  //connect to the database
  mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`Database connected successfully`))
    .catch(err => console.log(err));

  //since mongoose promise is depreciated, we overide it with node's promise
  mongoose.Promise = global.Promise;

  // handling everything else with Next.js
  server.get("*", handle);
  server.post("*", handle);

  http.createServer(server).listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
  });
});