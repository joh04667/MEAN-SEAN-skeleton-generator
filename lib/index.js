#!/usr/bin/env node

process.title = "lambda skeleton generator";

var path = require('path');
var fs = require('fs');
// var readline = require('readline');
var files = require('./modules/files');

var root = __dirname + "/" //+ 'test/';

var cwd = process.cwd();

//create files

console.log('Creating folders....')

files.makeFiles(cwd, files.fileStructure);

console.log('Done');

console.log('Filling in files....');


fs.writeFile(root + '.gitignore', "node_modules\nDS_Store", (err =>{
  if(err) throw err;
}));


fs.createReadStream(root + 'files/index.html').pipe(fs.createWriteStream(cwd + "/server/public/views/index.html"));
fs.createReadStream(root + '/files/server.js').pipe(fs.createWriteStream(cwd + "/server/server.js"));
fs.createReadStream(root + '/files/index.js').pipe(fs.createWriteStream(cwd + "/server/routes/index.js"));
fs.createReadStream(root + '/files/sampleGrunt.js').pipe(fs.createWriteStream(cwd + "/Gruntfile.js"));
fs.createReadStream(root + '/files/samplePackage.json').pipe(fs.createWriteStream(cwd + "/package.json"));

console.log('All done!');
console.log('Just run npm init, npm install and then grunt!');


process.exit(1);
