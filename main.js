global.DEBUG = true;

const fs = require('fs');

const myArgs = process.argv.slice(2);

if(DEBUG) if(myArgs.length >= 1) console.log('App Args: ', myArgs);

switch(myArgs[0]) {
    case 'init':
    case 'i':
        if(DEBUG) console.log(myArgs[0], 'Initializing...');
        // require('./init.js');
        break;
    case 'config':
    case 'c':
        if(DEBUG) console.log(myArgs[0], 'Display Configuration File.');
        // require('./config.js');
        break;
    case 'token':
    case 't':
        if(DEBUG) console.log(myArgs[0], 'Generate a token for a new user.');
        // require('./token.js');
        break;
    case '--help':
    case '--h':
    default:
        fs.readFile(__dirname + "/help.txt", 'utf8', function(err, data) {
        if (err) throw err;
        console.log(data.toString());
        });
        break;

}