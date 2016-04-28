# MEAN-SEAN-skeleton-generator

To install:
`npm install -g lambda-mean-generator`

and run it in your root project folder at:
`lambda-skeleton`

Will generate a MEAN stack skeleton with files and dependancies. Designed to be lightweight, and a good jumping off point to working with some of Node's file system server functionality.

The program will generate a skeleton for a Mean stack app with a configured package.json. It will include by default Angular, Postgresql, Express, Bootstrap, Passport, and several utility packages as well as a configured gruntfile to bring these into the file structure.

Eventually this will be a more modular application, allowing users to configure and save their own file structure, as well as qualifying through user prompts the npm packages to install (Mongo or PSQL, jQuery or Angular, which Angular modules, etc....)

TODO: Run npm install for the user after folders are built, and configure to be installed globally from npm.
