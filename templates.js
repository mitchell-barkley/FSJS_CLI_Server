const folders = ['models', 'views', 'routes', 'images', 'logs', 'json'];

const configjson = {
    name: 'AppConfigCLI',
    version: '1.0.0',
    description: 'The Command Line Interface (CLI) for Main App.',
    main: 'main.js',
    superuser: 'admin',
    database: 'dvdrental'
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

module.exports = { folders, configjson, tokenjson };