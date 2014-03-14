var fs = require('fs');

fs.readdir(__dirname + '/recipe_data/', function (error, files) {
    if (error) throw error;
    console.log(files);
});
