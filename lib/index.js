#!/usr/bin/env node

process.title = "lambda skeleton generator";

var path = require('path');
var fs = require('fs');
var child_process = require('child_process');

var files = require('./modules/files');
var copyFileSync = require('./modules/copyFileSync');

var root = __dirname + "/" //+ 'test/';

var cwd = process.cwd();

//create files

console.log('Creating folders....')

files.makeFiles(cwd, files.fileStructure);

console.log('Done');

console.log('Filling in files....');


///////write template files into source TODO: modulate source desitnations for user input
//just create .gitignore, no need to copy from a template yet
fs.writeFileSync(cwd + '/.gitignore', "node_modules\nDS_Store");


// callback for copy function
var cb = function(err) {
  if(err) throw err;
}

// copy files into directory. TODO: make this modular as well
copyFileSync(root + 'files/index.html', cwd + '/server/public/views/index.html', cb);
copyFileSync(root + 'files/server.js', cwd + '/server/server.js', cb);
copyFileSync(root + 'files/index.js', cwd + '/server/routes/index.js', cb);
copyFileSync(root + 'files/sampleGrunt.js', cwd + '/Gruntfile.js', cb);
copyFileSync(root + 'files/samplePackage.json', cwd + '/package.json', cb);
copyFileSync(root + 'files/connection.js', cwd + '/server/db/connection.js', cb);

console.log('Done');

console.log('Running npm init.....');

// this will synchronously execute npm init in a child shell, but will be able to use the
// parent's input and output.
var child = child_process.execSync('npm init', {stdio:[0,1,2]});
console.log('Updating dependencies....');


console.log('Installing packages...');
// TODO: log the list of user-selected packages as they install
console.log('Packages include Angular, Bootstrap, Express, PG, body-parser, grunt(copy, uglify and watch), Passport and Nodemon.');
var install = child_process.execSync('npm install', {stdio:[0,1,2]});

console.log('Grunting....');
var pig = child_process.execSync('grunt');
console.log('Done!');


// console.log('Initializing new git repo...');
// var git = child_process.execSync('git init', {stdio:[0,1,2]});



console.log('Lambda Rocks!');
// process.exit(1);
