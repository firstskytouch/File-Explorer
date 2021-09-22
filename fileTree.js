const fs = require("fs");
const path = require("path");

function getDirTree(filename) {
  const stats = fs.lstatSync(filename);
  let info = {
    path: filename,
    name: path.basename(filename),
  };

  if (stats.isDirectory()) {
    info.type = "folder";
    info.children = fs.readdirSync(filename).map(function (child) {
      return getDirTree(filename + "/" + child);
    });
  } else {
    info.type = "file";
  }

  return info;
}

module.exports = getDirTree;
