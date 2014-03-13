var app = {
    models: {},
    collections: {},
    views: {},
    routers: {},
    init: function () {
        app.cookbook = new app.collections.Cookbook(recipesData);
        app.router = new app.routers.Router();
    }
};

app.routers.Router = Backbone.Router.extend({
    initialize: function () {
        Backbone.history.start();
    },

    routes: {
        '': 'index',
        'create': 'createRecipe',
        'recipe/:id': 'recipeDetail'
    },

    index: function () {
        var index = new app.views.Index();
        var cookbook = new app.views.Cookbook(app.cookbook.models);
    },

    createRecipe: function () {
        var form = new app.views.CreateRecipe();
    },

    recipeDetail: function (id) {
        var detail = new app.views.RecipeDetail({
            model: app.cookbook.get(id)
        });
    }
});
