#!/usr/bin/env node

process.title = "lambda skeleton generator";

var path = require('path');
var fs = require('fs');
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
copyFileSync(root + '/files/index.html', cwd + '/server/public/views/index.html', cb);
copyFileSync(root + '/files/server.js', cwd + '/server/server.js', cb);
copyFileSync(root + 'files/index.js', cwd + '/server/routes/index.js', cb);
copyFileSync(root + '/files/sampleGrunt.js', cwd + '/Gruntfile.js', cb);
copyFileSync(root + 'files/samplePackage.json', cwd + '/package.json', cb);




// process.exit(1);
