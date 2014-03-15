var db = require('./database');

module.exports = {
    index: function (req, res, next) {
        db.recipes.find(function (error, recipes) {
            if (error) return next(error);
            res.render('index', {recipesData: JSON.stringify(recipes)});
        });
    },

    recipes: {
        all: function (req, res, next) {
            db.recipes.find(function (error, recipes) {
                if (error) return next(error);
                res.send(recipes);
            });
        },

        one: function (req, res, next) {
            db.recipes.findOne({_id: parseInt(req.params.id, 10)}, function (error, recipe) {
                if (error) return next(error);
                res.send(recipe);
            });
        },

        save: function (req, res, next) {
            db.recipes.findAndModify({
                query: {_id: parseInt(req.body._id, 10)},
                update: {$set: {
                    ingredients: req.body.ingredients,
                    steps: req.body.steps,
                    modified: new Date(),
                    tags: req.body.tags
                }}
            }, function (error, recipe) {
                if (error) return next(error);
                res.send(recipe);
            });
        }
    }
}
