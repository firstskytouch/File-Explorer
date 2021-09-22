"use strict";
var path = require("path");
var express = require("express");
const getDirTree = require("./fileTree");

const PORT = process.env.PORT || 3000;
const app = express();

const staticPath = path.join(__dirname, "build");
app.use(express.static(staticPath));

// Allows you to set port in the project properties.

const [_cmd, _path, ...dirs] = process.argv;

const root = {
  path: "./",
  name: "root",
  type: "folder",
  children: dirs.map(getDirTree),
};

app.get("/api/tree", function (req, res) {
  res.send(JSON.stringify(root));
});

app.listen(PORT, () => {
  console.log("listening");
});
