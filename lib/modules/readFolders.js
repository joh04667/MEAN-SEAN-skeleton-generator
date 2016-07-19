var fs = require('fs');

function readFolders(currentPath){
  var fileStructure = {
    name: 'root',
    files: [],
    folders: []
  };

  //var currentPath = '/Users/sashakramer/workspace/read-file-structure';  // replace this with user input

  var gitIgnorePath = currentPath + '/.gitignore';
  var gitIgnoreContents = [];

  // read .gitignore to ignore its contents in the file structure
  try{
    var gitIgnore = fs.lstatSync(gitIgnorePath);
    if(gitIgnore.isFile()){
      var gitIgnoreString = fs.readFileSync(gitIgnorePath, 'utf-8');
      gitIgnoreContents = gitIgnoreString.split('\n');
    }
  } catch(err){
    //console.log('no git ignore')
  }
  gitIgnoreContents.push('.git'); // add in .git directory because we always want to ignore it, even if there's no .gitignore

  readFolder(currentPath, fileStructure);

  console.log('fileStructure', fileStructure);

  function readFolder(path, currentObject){

    var currentFolderContents = fs.readdirSync(path);

    currentFolderContents.map(function(x){
      var gitIgnored = false;
      gitIgnoreContents.map(function(z){
        //console.log('x, z:', x, z);
        if(x == z){
          gitIgnored = true;
        }
      });

      if(!gitIgnored){
        var xPath = path + '/' + x;
        var isFolder = fs.lstatSync(xPath).isDirectory();
        if(!isFolder){
          currentObject.files.push(x);
        } else {
          var tempFolder = {
            name: x,
            files: [],
            folders: []
          };
          currentObject.folders.push(tempFolder);

          currentObject.folders.map(function(y){
            var yPath = path + '/' + y.name;
            readFolder(yPath, y);
          });
        }
      } else {
        //console.log('this was gitignored:', x);
      }
    });
  }
  return fileStructure.folders;
}

module.exports = readFolders;
