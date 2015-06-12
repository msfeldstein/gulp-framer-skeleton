#!/usr/bin/env node
var fs = require('fs');;
var fsx = require('fs-extra');
var npm = require('npm');
var child_process = require('child_process');

var projectName = process.argv[2];
console.log("Generating Project: ", projectName)

// Create the directory and copy all the files over
var newdir = process.cwd() + "/" + projectName
fs.mkdirSync(projectName);
var neededFiles = ["src", "gulpfile.js", "package.json", "README.md"]
neededFiles.forEach(function(filename) {
  var file = __dirname + '/../' + filename;
  fsx.copySync(file, newdir + "/" + filename);
});

// Move into the project directory
process.chdir(projectName);

// change the name of the npm project to the name of your project
var packageJson = fs.readFileSync("package.json").toString();
packageJson = packageJson.replace("PrototypeBase", projectName);
fs.writeFileSync("package.json", packageJson, 'utf8');

// run `npm install`
npm.load(function() {
  npm.commands.install();
  npm.on("log", function(message) {
    console.log("npm: ", message);
  });

  try {
    child_process.execSync("which gulp");
    console.log("Start the server by running `gulp`")
  } catch (e) {
    console.error("Install gulp globally with `npm install gulp -g` then run server with `gulp`");
  }

})
