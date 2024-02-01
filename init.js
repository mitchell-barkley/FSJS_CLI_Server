const fs = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;

const folders = ['models', 'views', 'routes', 'images', 'logs', 'json'];

const configjson = {
    name: 'AppConfigCLI',
    version: '1.0.0',
    description: 'The Command Line Interface (CLI) for Main App.',
    main: 'main.js',
    superuser: 'admin',
    database: 'dvdrental','sakila':'world'
};

const tokenjson = [{
    created: '1985-10-08 18:35:00',
    username: 'IRONDUKE',
    email: 'fake_address@example.com',
    phone: '5558675309',
    token: 'token',
    expires: '2019-12-23 12:30:00',
    confirmed: 'tbd'
}];

function createFolders() {
    if(DEBUG) console.log('Initializing folders...');
    let mkcount = 0;
    folders.forEach(element => {
        if(DEBUG) console.log(element);
        try {
            if(!fs.existsSync(path.join(__dirname, element))) {
                fsPromises.mkdir(path.join(__dirname, element));
                mkcount++;
            }
        } catch (err) {
            console.log(err);
        }
    });
    if(mkcount === 0) {
        if(DEBUG) console.log('All folders already exist.');
    } else if (mkcount === folders.length) {
        if(DEBUG) console.log('All folders successfully created.');
    } else {
        if(DEBUG) console.log(mkcount + ' of ' + folders.length + ' folders were created.');
    }
};

function createFiles() {
    if(DEBUG) console.log('Initializing files...');
    try {
        let configdata = JSON.stringify(configjson, null, 2);
        if(!fs.existsSync(path.join(__dirname, './json/config.json'))) {
            fs.writeFile('./json/config.json', configdata, (err) => {
                if(err) {
                    console.log(err)
                }
                else {
                    console.log('Data written to configuration file.');
                }
            })
        } else {
            console.log('Configuration file already exists.');
        }
        let tokendata = JSON.stringify(tokenjson, null, 2);
        if(!fs.existsSync(path.join(__dirname, './json/token.json'))) {
            fs.writeFile('./json/token.json', tokendata, (err) => {
            if(err) {
                console.log(err)
            } else {
                console.log('Data written to token file.');
            }
            }
            );
        } else {
        console.log('Token file already exists.');
        }
        
    } catch(err) {
        console.log(err);
    }
};

const myArgs = process.argv.slice(2);

function initializeApp() {
    if(DEBUG) console.log('Initializing the app.');
    switch (myArgs[1]) {
    case '--all':
        if(DEBUG) console.log('Creating all required folders and files.');
        createFolders();
        createFiles();
        break;
    case '--cat':
        if(DEBUG) console.log('Writing data to files.');
        createFiles();
        break;
    case '--mk':
        if(DEBUG) console.log('Creating folders.');
        createFolders();
        break;
    case '--help':
    case '--h':
    default:
        fs.readFile(__dirname + "/usage.txt", (error, data) => {
            if(error) throw error;
            console.log(data.toString());
        });
    }
}

module.exports = {
    initializeApp,
}