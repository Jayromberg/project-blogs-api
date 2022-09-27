const express = require('express');
const routes = require('./routes');

// ...

const app = express();

app.use(express.json());

routes(app);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
