var fs = require('fs');
var exec = require('child_process');

var fileStructure = [
{ name: 'client',
  files: ['client.js'],
  folders: []
},
{ name: 'modules',
  files: [],
  folders: []
},
{ name:'server',
  files: ['server.js'],
  folders: [{
            name: 'db',
            files: ['connection.js'],
            folders: []
          },
          {
            name: 'public',
            files: [],
            folders: [{
                  name: 'views',
                  files: ['index.html'],
                  folders: []
                },
                {
                  name: 'stylesheets',
                  files: ['index.css'],
                  folders: []
                }]
          },
          { name: 'routes',
            files: ['index.js'],
            folders: []
          }]
}
];



// i can't believe this worked

// loops through each array item and produces folders in the current dir. calls makepath() to make files in those.
function makeFiles(dir, arr) {
  var current = dir;
  current += current.match(/\/$/) ? '/' : ''; // add a / to file dir if not there
  arr.forEach(s => makepath(current, s));

}

// makes files in directory passed to it. If this folder has folders inside of it, calls makefiles on that array.
function makepath(dir, obj) {
  // make current folder set and set var for that folder path
  var currentDir = dir + obj.name;
  makeDir(currentDir);
  // for each file in this folder.files, create that file
  obj.files.forEach(filename => fs.writeFileSync(currentDir + '/' + filename));
    // if this folder.folders has more folders, call makeFiles recursively and pass thie path of this folder to it
  if(obj.folders !== []) {
    makeFiles(currentDir, obj.folders);
    }
}

// error handling for making directory (if dir exists)
function makeDir(directory) {
  try {
    fs.statSync(directory);
  } catch(e) {
    fs.mkdirSync(directory);
  }
}

// TODO: adapt a procedural filesystem that allows for user input in templating.


module.exports.fileStructure = fileStructure;
module.exports.makeFiles = makeFiles;
