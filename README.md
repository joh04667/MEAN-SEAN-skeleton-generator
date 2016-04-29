# MEAN-SEAN-skeleton-generator
https://www.npmjs.com/package/lambda-mean-generator

###To install:
`npm install -g lambda-mean-generator`

#####and run it in any new root project folder with:

`lambda-skeleton`
####or:
`banana-sandwich`

Will generate a SEAN stack skeleton with files and dependancies. Designed to be lightweight and fast.

Most generators out there, while useful, usually include far too many services and packages to be considered when you only want a bare-bones skeleton project--the kind that you're building frequently when learning to create apps. I decided to create this package to fill that niche (as well as learn a little about Node scripting outside of Express).

The program will generate a skeleton for a SEAN stack app with a configured package.json. It will include by default Angular, Postgresql, Express, Bootstrap, Passport, and several utility packages (grunt copy, uglify, watch and nodemon etc.) as well as a configured gruntfile to bring these into the file structure. It will also template out some files (*just* enough to serve index.html).

Eventually this will be a more modular application, allowing users to configure and save their own file structure, as well as qualifying through user prompts (commander) the npm packages to install (Mongo or PSQL, jQuery or Angular, which Angular modules, etc....). It was built with that in mind.

Please feel free to contribute to this project! I made this as a learning opportunity and would love to start learning how to collaborate with people.

Here's to never making an entire folder tree again!
