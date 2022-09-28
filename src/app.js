const express = require('express');
const passport = require('passport');
const routes = require('./routes');
const authentication = require('./middlewares/authenticationStrategy');

// ...

const app = express();

app.use(express.json());

routes(app);
authentication(passport);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
