const fs = require('fs');
const path = require('path');
const crc32 = require('crc/crc32');
const { format } = require('date-fns');

const myArgs = process.argv.slice(2);
const DEBUG = true;

function tokenList() {
    if(DEBUG) console.log('token.tokenList()');
    fs.readFile(__dirname + "/json/token.json", 'utf-8', (error, data) => {
        if(error) throw error;
        let tokens = JSON.parse(data);
        console.log('** User List **');
        tokens.forEach((object) => {
            console.log(' * ' + object.username + ' - ' + object.token);
        });
    });
};

function newToken(username) {
    if(DEBUG) console.log('token.newToken()');
    let newToken = JSON.parse(`{
        "created": "1969-01-31 23:59:59",
        "username": "username",
        "email": "user@example.com",
        "phone": "555-555-5555",
        "token": "token",
        "expires": "1969-02-31 23:59:59",
        "confirmed": "tbd"
    }`);

    let now = new Date();
    let expires = addDays(now, 30);

    newToken.created = `${format(now, 'yyyy-MM-dd HH:mm:ss')}`;
    newToken.username = username;
    newToken.token = crc32(username).toString(16);
    newToken.expires = format(expires, 'yyyy-MM-dd HH:mm:ss');

    fs.readFile(__dirname + "/json/token.json", 'utf-8', (err, data) => {
        if(err) {
            console.log(err);
        } else {
            let token = JSON.parse(data);
            token.push(newToken);
            userTokens = JSON.stringify(token);
            fs.writeFile(__dirname + "/json/token.json", userTokens, (err) => {
                if(err) {
                    console.log(err);
                } else {
                    console.log(`User token created for ${username}.`);
                }
            });
        }
    });
    return newToken.token;
};



function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function tokenApp() {
    if(DEBUG) console.log('tokenApp()');
    switch (myArgs[1]) {
        case '--count':
            // tokenCount();
            if(DEBUG) console.log('Counting user tokens...');
            break;
        case '--list':
            if(DEBUG) console.log('Generating user token...');
            tokenList();
            break;
        case '--new':
            if (myArgs.length >= 3) {
                if(DEBUG) console.log('Generating user token...');
                newToken(myArgs[2]);
            } else {
                console.log('Invalid username.');
            }
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

module.exports = {
    tokenApp,
}