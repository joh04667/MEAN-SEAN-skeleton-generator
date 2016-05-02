#!/usr/bin/env node

process.title = "lambda skeleton generator";


//// node modules ////
var path = require('path');
var fs = require('fs');
var child_process = require('child_process');
// var program = require('commander');
var prompt = require ('prompt');
var colors = require('colors/safe');

//// custom module import ////
var files = require('./modules/files');
var copyFileSync = require('./modules/copyFileSync');


//// filepath vars - 'root' is install directory ////
var root = __dirname + "/";
var cwd = process.cwd();


////// user prompts //////

var confirm = [
  {
    name: 'confirm',
    validator: /(y|n)/i,
    warning: 'Please only enter "y" or "n"',
    default: 'y',
    message: 'Should I generate your project in ' + colors.red(cwd.match(/\/[^\/]+$/)[0]) + '?' + colors.yellow('  (y/n)')
  },
];

prompt.message = '';

prompt.start();


prompt.get(confirm, function(err, result) {
  if(err) { return onErr(err); }
  if(result.confirm.toLowerCase() === 'y') {
    console.log('Great! Let\'s get started.');
    generate();
  }
  if(result.confirm.toLowerCase() === 'n') {
    console.log('Please run me from the root directory of your new project.');
    process.exit(1);
  }
});

// prompt error handling
function onErr(err) {
  console.log(err);
  return 1;
}



/// i am wrapping the entire generator into this generate() function so it can be used as a callback to the user prompt.
/// it may be wise in the future to move this into its own module to stay clean
function generate() {

  //create files
  console.log('Creating folders....');

  files.makeFiles(cwd, files.fileStructure);

  console.log('Done');

  console.log('Filling in files....');





  ///////write template files into source TODO: modulate source desitnations for user input

  //just create .gitignore, no need to copy from a template yet
  fs.writeFileSync(cwd + '/.gitignore', "node_modules\nDS_Store");


  // callback for copy function
  var cb = function(err) {
    if(err) throw err;
  };

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
  // TODO: log the list of user-selected packages as they install (instead of static list)
  console.log('Packages include Angular, Bootstrap, Express, PG, body-parser, grunt(copy, uglify and watch), Passport and Nodemon.');
  var install = child_process.execSync('npm install', {stdio:[0,1,2]});
  console.log('Done.');


  console.log('Grunting....');
  var pig = child_process.execSync('grunt');
  console.log('Done!');


  console.log('Initializing new git repo...');
  var git = child_process.execSync('git init', {stdio:[0,1,2]});

  console.log('Done!');

  console.log('Lambda Rocks!');



  process.exit(1);
}
