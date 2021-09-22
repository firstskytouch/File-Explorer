"use strict";
const path = require("path");
const express = require("express");
const chokidar = require("chokidar");

const getDirTree = require("./fileTree");

const PORT = process.env.PORT || 3000;
const app = express();

const staticPath = path.join(__dirname, "build");
app.use(express.static(staticPath));

// Allows you to set port in the project properties.

const [_cmd, _path, ...dirs] = process.argv;

var root = undefined;

function updateTree() {
  root = {
    path: "./",
    name: "root",
    type: "folder",
    children: dirs.map(getDirTree),
  };
}

updateTree();

dirs.forEach((dir) => {
  const watcher = chokidar.watch(dir, { ignored: /^\./, persistent: true });
  watcher
    .on("add", function (path) {
      updateTree();
      console.log("File", path, "has been added");
    })
    .on("change", function (path) {
      updateTree();
      console.log("File", path, "has been changed");
    })
    .on("unlink", function (path) {
      updateTree();
      console.log("File", path, "has been removed");
    })
    .on("error", function (error) {
      updateTree();
      console.error("Error happened", error);
    });
});

app.get("/api/tree", function (req, res) {
  res.send(JSON.stringify(root));
});

app.listen(PORT, () => {
  console.log("listening");
});
