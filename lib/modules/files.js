var fs = require('fs');
var exec = require('child_process');

var fileStructure = [
{ name: 'client',
  files: ['client.js'],
  folders: []
},
{ name: 'modules',
  files: ['connection.js'],
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



// HOLY CRAP ON A STICK IT WORKED

// loops through each array item and produces folders in the current dir. calls makepath() to make files in those.
function makeFiles(dir, arr) {
  var current = dir;
  !current.match(/\/$/) ? current += '/' : current += ''; // add a / to file dir if not there
  arr.forEach(s => makepath(current, s));

}

// makes files in directory passed to it. If this folder has folders inside of it, calls makefiles on that array.
function makepath(dir, obj) {
  // make current folder set and set var for that folder path
  var currentDir = dir + obj.name;
  makeDir(currentDir);
  // for each file in this foleder, create that file
  obj.files.forEach(filename => fs.writeFileSync(currentDir + '/' + filename));
    // if this folder has more folders, call makeDir recursively
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

 //TODO: forget this procedural filesystem and just make one to start with. K?????
 //TODO: also ask about synchronous processes vs async



module.exports.fileStructure = fileStructure;
module.exports.makeFiles = makeFiles;
