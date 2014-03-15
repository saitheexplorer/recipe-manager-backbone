var restify = require('restify');
var app = restify.createServer();

app.get('/recipes', function (req, res, next) {
    res.send([{
        "_id": 81,
        "name": "Stir-Fried Tofu And Cabbage With Ginger Recipe",
        "ingredients": [],
        "steps": []
    }]);

    next();
});

app.get('/recipes/:id', function (req, res, next) {
    res.send(req.params.id);
    next();
});

app.listen(8080);
