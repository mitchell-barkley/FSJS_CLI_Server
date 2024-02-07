const fs = require("fs");
const myArgs = process.argv.slice(2);
const { configjson } = require('./templates.js');

function displayConfig() {
    if(DEBUG) console.log('Displaying configuration file...');
    fs.readFile(__dirname + "/json/config.json", (error, data) => {
        if(error) throw error;
        console.log(JSON.parse(data));
    });
}

function resetConfig() {
    if(DEBUG) console.log('Resetting configuration file...');
    let configdata = JSON.stringify(configjson, null, 2);
    fs.writeFile(__dirname + '/json/config.json', configdata, (err) => {
        if(err) {
            console.log(err);
        } else {
            console.log('Configuration file reset.');
        }
    });
}

function setConfig() {
    if(DEBUG) console.log('config.setConfig()');
    if(DEBUG) console.log(myArgs);

    let match = false;
    fs.readFile(__dirname + "/json/config.json", (error, data) => {
        if(error) throw error;
        if(DEBUG) console.log(JSON.parse(data));
        let cfg = JSON.parse(data);
        for(let key of Object.keys(cfg)) {
            if(DEBUG) console.log(`KEY: ${key}`);
            if(myArgs[2] === key) {
                cfg[key] = myArgs[3];
                match = true;
            }
        }
        if(!match) {
            console.log(`Invalid Key: ${myArgs[2]}`);
        }
        if(DEBUG) console.log(cfg);
        data = JSON.stringify(cfg, null, 2);
        fs.writeFile(__dirname + "/json/config.json", data, (err) => {
            if(err) {
                console.log(err);
            } else {
                console.log('Configuration file updated.');
            }
        });
    });
}

function configApp() {
    if(DEBUG) console.log('Configuring the app...');

    switch (myArgs[1]) {
    case '--display':
        if(DEBUG) console.log('Displaying the configuration file.');
        displayConfig();
        break;
    case '--reset':
        if(DEBUG) console.log('Resetting the configuration file.');
        resetConfig();
        break;
    case '--set':
        if(DEBUG) console.log('Setting the configuration file.');
        setConfig();
        break;
    case '--help':
    case '--h':
    default:
        fs.readFile(__dirname + "/help.txt", (error, data) => {
            if(error) throw error;
            console.log(data.toString());
        });
    }
}

module.exports = { configApp };