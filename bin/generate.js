#!/usr/bin/env node
var fs = require('fs');;
var fsx = require('fs-extra');
var npm = require('npm');

var projectName = process.argv[2];
console.log("Generating Project: ", projectName)

var newdir = process.cwd() + "/" + projectName
fs.mkdirSync(projectName);
var neededFiles = ["src", "gulpfile.js", "package.json", "README.md"]
neededFiles.forEach(function(filename) {
  var file = __dirname + '/../' + filename;
  fsx.copySync(file, newdir + "/" + filename);
});

process.chdir(projectName);
npm.load(function() {
  npm.commands.install();
  npm.on("log", function(message) {
    console.log("npm: ", message);
  })
})
