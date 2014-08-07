var db = require('somewhere');
var id = require('shortid');

db.connect('./data.json');

module.exports = {
    index: function (req, res, next) {
        res.render('index', {recipesData: JSON.stringify(db.find('recipes', {}))});
    },

    recipes: {
        all: function (req, res, next) {
            res.send(db.find('recipes', {}));
        },

        one: function (req, res, next) {
            res.send(db.findOne('recipes', {id: req.params.id}));
        },

        save: function (req, res, next) {
            res.send(db.update('recipes', req.body.id, {
                name: req.body.name,
                ingredients: req.body.ingredients,
                steps: req.body.steps,
                modified: new Date(),
                tags: req.body.tags
            }));
        },

        create: function (req, res, next) {
            req.body.id = id();
            res.send(db.recipes.save('recipes', req.body));
        }
    }
};
