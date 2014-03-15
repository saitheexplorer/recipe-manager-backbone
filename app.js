var express = require('express');
var path = require('path');

var app = express();
var routes = require('./routes');

app.set('views', __dirname);
app.set('view engine', 'jade');

app.get('/', routes.index);
app.get('/recipes', routes.recipes.all);
app.get('/recipes/:id', routes.recipes.one);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(8080);
