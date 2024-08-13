const express = require('express');
const app = express();
const routes = require('./routes/router');

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:false}));
app.use('/', routes);

app.listen(3000);
module.exports = app;