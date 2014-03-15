var url = 'recipe-manager';
var collections = ['recipes'];

var db = require('mongojs').connect(url, collections);
module.exports = db;
